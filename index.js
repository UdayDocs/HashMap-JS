class HashMap {
  constructor(loadFactor = 0.75) {
    this.capacity = 16; // initial bucket count
    this.loadFactor = loadFactor;
    this.buckets = Array.from({ length: this.capacity }, () => []);    // Create an array of empty buckets (each bucket is an array)
    this.size = 0;
  }

  hash(key) {  // Simple hash function for string keys.
    let hashCode = 0;
    const prime = 31;
    const mod = 1e9 + 7; // a large prime to reduce overflow
    for (let i = 0; i < key.length; i++) {
      hashCode = (prime * hashCode + key.charCodeAt(i)) % mod;
    }
    return hashCode % this.capacity;
  }

  set(key, value) {  // Set or update the key-value pair.
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (const entry of bucket) {    // Update value if key already exists.
      if (entry.key === key) {
        entry.value = value;
        return;
      }
    }

    bucket.push({ key, value });    // Otherwise, add the new key-value pair.
    this.size++;
    if (this.size > this.loadFactor * this.capacity) {    // Resize if needed.
      this.resize();
    }
  }

  get(key) {  // Get the value for a given key.
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (const entry of bucket) {
      if (entry.key === key) {
        return entry.value;
      }
    }
    return null;
  }

  has(key) {  // Check if the key exists.
    return this.get(key) !== null;
  }

  remove(key) {  // Remove a key-value pair.
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  resize() {  // Resize the buckets when the load factor threshold is exceeded.
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this.size = 0;

    for (const bucket of oldBuckets) {    // Re-insert all entries into the new buckets.
      for (const entry of bucket) {
        this.set(entry.key, entry.value);
      }
    }
  }

  length() {  // Return the number of key-value pairs.
    return this.size;
  }

  clear() {  // Clear all entries.
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this.size = 0;
  }

  keys() {  // Return an array of all keys.
    return this.buckets.flatMap(bucket => bucket.map(entry => entry.key));
  }

  values() {  // Return an array of all values.
    return this.buckets.flatMap(bucket => bucket.map(entry => entry.value));
  }

  entries() {  // Return an array of [key, value] pairs.
    return this.buckets.flatMap(bucket => bucket.map(entry => [entry.key, entry.value]));
  }
}

// ----- Test Cases -----

// Create an instance of HashMap.
const map = new HashMap();

// Add some key-value pairs.
map.set("apple", 1);
map.set("banana", 2);
map.set("cherry", 3);

// Retrieve values.
console.log("Value for 'banana':", map.get("banana")); // Expected output: 2

// Check existence of keys.
console.log("Has 'cherry'?", map.has("cherry")); // Expected output: true
console.log("Has 'durian'?", map.has("durian")); // Expected output: false

// List all keys, values, and entries.
console.log("Keys:", map.keys());           // Expected output: ["apple", "banana", "cherry"]
console.log("Values:", map.values());         // Expected output: [1, 2, 3]
console.log("Entries:", map.entries());       // Expected output: [["apple", 1], ["banana", 2], ["cherry", 3]]

// Remove a key.
map.remove("banana");
console.log("Has 'banana' after removal?", map.has("banana")); // Expected output: false

// Check length.
console.log("Length:", map.length()); // Expected output: 2

// Clear the map.
map.clear();
console.log("Length after clear:", map.length()); // Expected output: 0
