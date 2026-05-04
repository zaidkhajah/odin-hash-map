class HashSet {
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
        this.capacity *= 2; const keys = this.keys(); 
        this.buckets = Array.from({length : this.capacity}, () => []);
        keys.forEach(key => this.set(key));
    }

    set (key) {
        const bucket = this.buckets[this.hash(key)];
        const index = bucket.findIndex(kvPair => kvPair.key === key);
        if (index !== -1) return;

        bucket.push(key); 
        if (this.length() > this.loadFactor * this.capacity) this.doubleCapacity();
        return;
    }

    get (key) {
        const k = this.buckets[this.hash(key)].includes(key);
        return k ? key : null;
    }

    has (key) {
        return this.get(key) ? true : false;
    }

    remove (key) {
        const bucket = this.buckets[this.hash(key)];
        const index = bucket.findIndex(k => k === key);
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
            bucket.forEach(k => res.push(k))
        );
        return res;
    }

    entries () {
        const res = [];
        this.buckets.forEach(bucket => bucket.forEach(k => res.push(k)));
        return res;
    }

    toString () {
        let str = "";
        const pad = String(this.buckets.length - 1).length;
        this.buckets.forEach((bucket, i) => str += `| ${"0".repeat(Math.abs(pad - String(i).length))}${i} | -> ` + bucket.map(k => k).join(" - ") + "\n");
        return str;
    }
}

export { HashSet }