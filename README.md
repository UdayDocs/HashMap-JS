## Features

* **Collision Handling:** Implements separate chaining using arrays (buckets) to handle collisions.
* **Dynamic Resizing:**  Automatically resizes the underlying storage when the load factor exceeds a specified threshold (default 0.75) to maintain performance.  Resizing doubles the capacity.
* **Hash Function:** Uses a simple but effective hash function with a prime number and modulo operation to distribute keys across buckets.
* **Common Operations:** Includes methods for:
