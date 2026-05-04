class HashMap {
    constructor () {
        this.loadFactor = 0.75; this.capacity = 16;
        this.buckets = Array.from({length : this.capacity}, () => []);
    }

    checkIndex (hashCode) {
        if (hashCode < 0 || hashCode >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
    }

    hash (key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i=0; i<key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        this.checkIndex(hashCode);
        return hashCode;
    }

    doubleCapacity () {
        this.capacity *= 2; const entries = this.entries(); 
        this.buckets = Array.from({length : this.capacity}, () => []);
        entries.forEach(pair => this.set(...pair));
    }

    set (key, value) {
        const bucket = this.buckets[this.hash(key)];
        const index = bucket.findIndex(kvPair => kvPair.key === key);
        if (index === -1) { 
            bucket.push({key, value}); 
            if (this.length() > this.loadFactor * this.capacity) this.doubleCapacity();
            return;
        }
        bucket[index].value = value;
    }

    get (key) {
        const kvPair = this.buckets[this.hash(key)].find(kvPair => kvPair.key === key);
        return kvPair ? kvPair.value : null;
    }

    has (key) {
        return this.buckets[this.hash(key)]
        .findIndex(kvPair => kvPair.key === key) ? true : false;
    }

    remove (key) {
        const bucket = this.buckets[this.hash(key)];
        const index = bucket.findIndex(kvPair => kvPair.key === key);
        if (index === -1) return false;
        bucket.splice(index, 1);
        return true;
    }

    length () {
        return this.buckets.reduce((len, bucket) => len += bucket.length, 0);
    }

    clear () {
        this.buckets = Array.from({length : this.capacity}, () => []);
    }

    keys () {
        const res = [];
        this.buckets.forEach(
            bucket.forEach(kvPair => res.push(kvPair.key))
        );
        return res;
    }

    values () {
        const res = [];
        this.buckets.forEach(
            bucket.forEach(kvPair => res.push(kvPair.value))
        );
        return res;
    }

    entries () {
        const res = [];
        this.buckets.forEach(bucket => bucket.forEach(kvPair => res.push([kvPair.key, kvPair.value])));
        return res;
    }

    toString () {
        let str = "";
        const pad = String(this.buckets.length - 1).length;
        this.buckets.forEach((bucket, i) => str += `| ${"0".repeat(Math.abs(pad - String(i).length))}${i} | -> ` + bucket.map(kv => kv.key).join(" - ") + "\n");
        return str;
    }
}

export { HashMap }