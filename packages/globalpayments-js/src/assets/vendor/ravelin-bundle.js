/*! ravelinjs 2.3.0 - https://github.com/unravelin/ravelinjs. Copyright 2026 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('detectincognitojs')) :
    typeof define === 'function' && define.amd ? define(['detectincognitojs'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Ravelin = factory(global.detectIncognito));
})(this, (function (detectincognitojs) { 'use strict';

    /**
     * CookieJar provides getters/setters for cookies.
     */
    class CookieJar {
        cfg;
        samesite;
        constructor(cfg) {
            this.cfg = cfg;
        }
        /**
         * Returns the value of the cookie of the given name, or undefined.
         * @param name The name of the cookie to retrieve.
         */
        get(name) {
            const cookies = document.cookie.split('; ');
            for (let i = cookies.length - 1; i >= 0; i--) {
                const x = cookies[i].split('=');
                if (x[0] === name) {
                    return x[1];
                }
            }
            return undefined;
        }
        /**
         * Set a cookie on the given domain.
         * @param c The cookie options to set.
         */
        set(c) {
            const cook = c.name +
                '=' +
                c.value +
                ';path=' +
                (c.path || '/') +
                (c.expires ? ';expires=' + c.expires.toUTCString() : '') +
                (this.cfg.domain ? ';domain=' + this.cfg.domain : '');
            if (typeof this.samesite === 'undefined') {
                // Determine the correct value for SameSite.
                if (this.cfg.sameSite) {
                    this.samesite = ';SameSite=' + this.cfg.sameSite;
                }
                else if (hasWebKitSameSiteBug(window.navigator.userAgent)) {
                    this.samesite = '';
                }
                else if (window.location.protocol === 'https:') {
                    this.samesite = ';SameSite=None;Secure';
                }
                else {
                    this.samesite = ';SameSite=Lax';
                }
                // Try this samesite value.
                document.cookie = cook + this.samesite;
                if (this.get(c.name) === c.value) {
                    // We set the cookie successfully.
                    return;
                }
                // The cookie was discarded - avoid using samesite.
                this.samesite = '';
            }
            document.cookie = cook + this.samesite;
        }
    }
    /**
     * hasWebKitSameSiteBug indicates whether a given User-Agent treats
     * SameSite:None on cookies as if it were SameSite:Strict, which is very
     * different. Adapted from the procedure on
     * https://www.chromium.org/updates/same-site/incompatible-clients.
     *
     * @param ua string
     * @returns bool
     */
    function hasWebKitSameSiteBug(ua) {
        if (/\(iP.+; CPU .*OS 12[_\d]*.*\) AppleWebKit\//.test(ua)) {
            return true;
        }
        // prettier-ignore
        if (/\(Macintosh;.*Mac OS X 10_14[_\d]*.*\) AppleWebKit\//.test(ua)) {
            if (/^Mozilla\/[.\d]+ \(Macintosh;.*Mac OS X [_\d]+\) AppleWebKit\/[.\d]+ \(KHTML, like Gecko\)$/.test(ua)) {
                return true;
            }
            if (/Version\/.* Safari\//.test(ua) && !/Chrom(e|ium)/.test(ua)) {
                return true;
            }
        }
        return false;
    }

    /**
     * A lookup table used for uuid generation. Populated on first usage.
     */
    let _lut;
    /**
     * Generates a fresh [UUID v4](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_(random)).
     */
    function uuid() {
        let d0, d1, d2, d3;
        // Try to use the newer, randomer crypto.getRandomValues if available
        if (typeof window !== 'undefined' &&
            window.crypto &&
            window.crypto.getRandomValues &&
            typeof Int32Array !== 'undefined') {
            const d = new Int32Array(4);
            window.crypto.getRandomValues(d);
            d0 = d[0];
            d1 = d[1];
            d2 = d[2];
            d3 = d[3];
        }
        else {
            // Generate a random float between 0-1, multiple by 4294967295 (0xffffffff)
            // then round down via bitwise or (|0) so we are left with a random 32bit
            // number. These 4 values are then bitshifted around to produce additional
            // random values.
            d0 = (Math.random() * 0xffffffff) | 0;
            d1 = (Math.random() * 0xffffffff) | 0;
            d2 = (Math.random() * 0xffffffff) | 0;
            d3 = (Math.random() * 0xffffffff) | 0;
        }
        // Populate our lookup table (_lut) sequentially with hexidecimal strings
        // starting from 00 all the way through to ff, covering the entire 256 hex
        // range.
        if (!_lut) {
            _lut = [];
            for (let i = 0; i < 256; i++) {
                _lut[i] = (i < 16 ? '0' : '') + i.toString(16);
            }
        }
        // From our 4 random 32 bit values, we take the first 8 bits via bitwise AND
        // against 255 (&0xff), then the next 8 bits via bitwise shift right (>>8) and
        // repeat that 4 times through to get 4 random, 8 bit numbers, which are used
        // to look up the sequentially generated hex characters in our lookup table.
        // There are two interesting numbers here though:
        //
        // - the 15th character will always be a 4, because we bitwise AND against 15
        //   rather than 255 and we bitwise OR against 64 (0x40), producing values in
        //   the range of 64-79, which is the 16 hex values prefixed with a 4 (40
        //   through to 4f)
        //
        // - the 20th character will always be one of 8, 9, a or b because we bitwise
        //   AND against 63 and bitwise OR against 128, producing values in the range
        //   of 128-191, which is the 64 hex values ranging from 80 through to bf
        //
        // This logic almost mirrors the specification of v4 RFC 4122 UUIDs, but omits
        // the `clock_seq_hi_and_reserved` requirement
        // https://tools.ietf.org/html/rfc4122.
        //
        // The result are identifiers of 36 characters, 34 of which are
        // randomly assigned.
        // prettier-ignore
        return _lut[d0 & 0xff] + _lut[d0 >> 8 & 0xff] + _lut[d0 >> 16 & 0xff] + _lut[d0 >> 24 & 0xff] + '-' +
            _lut[d1 & 0xff] + _lut[d1 >> 8 & 0xff] + '-' + _lut[d1 >> 16 & 0x0f | 0x40] + _lut[d1 >> 24 & 0xff] + '-' +
            _lut[d2 & 0x3f | 0x80] + _lut[d2 >> 8 & 0xff] + '-' + _lut[d2 >> 16 & 0xff] + _lut[d2 >> 24 & 0xff] +
            _lut[d3 & 0xff] + _lut[d3 >> 8 & 0xff] + _lut[d3 >> 16 & 0xff] + _lut[d3 >> 24 & 0xff];
    }
    /**
     * Calls factory up to retries+1 times until the returned promise resolves.
     * @param factory A function that returns a Promise.
     * @param retries Number of retries (default 2).
     * @param retryBackoffMs Backoff in milliseconds (default 150).
     */
    function promiseRetry(factory, retries = 2, retryBackoffMs = 150) {
        let n = 0;
        return new Promise((resolve, reject) => {
            function attempt(delay) {
                return (new Promise(innerResolve => {
                    if (delay) {
                        setTimeout(innerResolve, delay);
                    }
                    else {
                        innerResolve();
                    }
                })
                    .then(() => {
                    return factory((err) => {
                        // We throw a specific object to catch in the next .catch block
                        // to distinguish between a retry request and a fatal error.
                        throw { message: 'promise-retry', err };
                    }, ++n);
                })
                    // Return the resolved value from calling factory
                    .then(resolve)
                    .catch((e) => {
                    if (e && e.message === 'promise-retry') {
                        if (n - 1 < retries) {
                            // Recurse with backoff
                            return attempt(delay + retryBackoffMs);
                        }
                        reject(e.err);
                        return;
                    }
                    reject(e);
                }));
            }
            return attempt(0);
        });
    }

    /**
     * The core module of RavelinJS provides device-identification, and is used by
     * other modules to communicate with the Ravelin API.
     */
    /**
     * Core library instance. Provides helpers and device identification.
     */
    class Core {
        version;
        key;
        api;
        sendRetryMs;
        cookie;
        sessionCookie;
        cookieExpiryDays;
        cookies;
        prefix;
        _id;
        _ids;
        constructor(cfg) {
            this.version = cfg.version || "2.3.0-ravelinjs";
            this.key = cfg.key;
            this.api = cfg.api || apiFromKey(this.key);
            // Remove trailing slashes from API URL
            this.api = this.api[0] + this.api.substring(1).replace(/^\/+|\/$/g, '');
            this.sendRetryMs = cfg.sendRetryMs || 150;
            this.cookie = cfg.cookie || 'ravelinDeviceId';
            this.sessionCookie = cfg.sessionCookie || 'ravelinSessionId';
            this.cookieExpiryDays = cfg.cookieExpiryDays ?? 365;
            this.cookies = new CookieJar({
                domain: cfg.cookieDomain,
                sameSite: cfg.cookieSameSite,
            });
            this.prefix = typeof cfg.prefix === 'string' ? cfg.prefix : 'rjs-';
            this._id = resolve(cfg.id);
            this.sync();
            if (cfg.init !== false) {
                this.attach(cfg.syncMs || 2000);
            }
        }
        /**
         * Reads our device ID from the browser.
         */
        id() {
            return this.ids().then(ids => {
                return ids.device;
            });
        }
        /**
         * Reads all IDs from the browser.
         */
        ids() {
            if (this._ids) {
                return this._ids;
            }
            this._ids = this.sniffError(this._id)
                .catch(() => undefined) // Swallow error
                .then((cfgId) => {
                let d = cfgId || this.cookies.get(this.cookie);
                let s = this.cookies.get(this.sessionCookie);
                if (!cfgId && s) {
                    // Restore d from s.
                    const sep = s.indexOf(':');
                    if (sep !== -1) {
                        d = s.substring(0, sep);
                    }
                    // Strip d: from the beginning of s.
                    if (d && s.startsWith(d + ':')) {
                        s = s.substring(d.length + 1);
                    }
                }
                return {
                    device: d || this.prefix + uuid(),
                    session: s || uuid(),
                };
            });
            return this._ids;
        }
        /**
         * Writes our ID into the various places we try to keep hold of it.
         */
        sync() {
            return this.ids().then(ids => {
                if (this.cookieExpiryDays > 0) {
                    this.cookies.set({
                        name: this.cookie,
                        value: ids.device,
                        expires: daysFromNow(this.cookieExpiryDays),
                    });
                }
                this.cookies.set({
                    name: this.sessionCookie,
                    value: ids.device + ':' + ids.session,
                });
            });
        }
        /**
         * attach to the browser to maintain our ids somewhere.
         * @param syncMs How often we attempt to re-synchronise.
         */
        attach(syncMs) {
            setInterval(() => {
                this.sync();
            }, syncMs);
        }
        /**
         * reportError sends an Error to Ravelin so that we can track what's happening.
         */
        reportError(e) {
            // Internal helper to perform the actual report
            const report = (ids) => {
                return this.send('POST', 'z/err', {
                    deviceId: ids && ids.device,
                    libVer: this.version,
                    type: e.name,
                    msg: e.message || e,
                    error: e.stack,
                }).then(() => { });
            };
            if (this._ids) {
                return this._ids
                    .catch(() => undefined) // Swallow error
                    .then(report);
            }
            return report();
        }
        /**
         * Invokes fn and reports any errors back to Ravelin. If the return value
         * of fn is a Promise-like object then any rejection is also reported.
         */
        sniffError(fn) {
            try {
                const p = typeof fn === 'function' ? fn() : fn;
                if (p && typeof p.then === 'function') {
                    p.catch((e) => {
                        this.reportError(e);
                    });
                }
                return p;
            }
            catch (e) {
                this.reportError(e);
                throw e;
            }
        }
        /**
         * Returns a function that invokes fn.bind(thisArg, ...args) and reports
         * any errors using sniffError.
         */
        bind(fn, thisArg, ...outerArgs) {
            const boundFn = fn.bind(thisArg, ...outerArgs);
            return (...innerArgs) => {
                return this.sniffError(() => {
                    return boundFn(...innerArgs);
                });
            };
        }
        /**
         * Makes a HTTP request and returns a Promise that resolves to the response
         * body or is rejected with any errors or non-2xx status codes.
         *
         * To avoid OPTIONS preflight requests, we do not accept setting headers here.
         * Instead we put the key in the query string and expect the server to support
         * whatever headers the browser cares to add.
         */
        send(method, path, body) {
            if (!this.key) {
                return Promise.reject(new Error('ravelin/core: no key set for API requests'));
            }
            // Build the URL to run
            let url = this.api + '/' + path.replace(/^\/+/, '');
            url += (url.indexOf('?') === -1 ? '?' : '&') + 'key=' + encodeURIComponent(this.key);
            url = url.replace(/^\/+/, '/');
            return promiseRetry((retry, attempt) => {
                // Make the request
                return this._sendXHR(method, url, JSON.stringify(body)).then(r => {
                    r.attempt = attempt;
                    // Resolve/reject based on status
                    if (r.status >= 200 && r.status < 300) {
                        return r;
                    }
                    else if (r.status === 400 && r.text === '') {
                        // Retry empty 400s injected by the BrowserStack tunnel
                        retry(r);
                    }
                    else if (r.status >= 500) {
                        // Retry errors
                        retry(r);
                    }
                    else if (!r.status) {
                        // Retry connection errors
                        retry(r);
                    }
                    return Promise.reject(r);
                });
            }, 2, this.sendRetryMs).catch((r) => {
                if (r && r.attempt) {
                    // Convert the response format into an error
                    throw new Error('ravelin/core: ' +
                        method +
                        ' ' +
                        url +
                        ' attempt ' +
                        r.attempt +
                        ' returned status ' +
                        r.status +
                        (r.text ? ' and body ' + r.text : ''));
                }
                throw r;
            });
        }
        /**
         * Wraps an XHR in a Promise.
         */
        _sendXHR(method, url, body) {
            return new Promise(resolve => {
                const r = new XMLHttpRequest();
                r.onreadystatechange = () => {
                    if (r.readyState === 4) {
                        resolve({ status: r.status, text: r.responseText });
                    }
                };
                // Send the request
                r.open(method, url);
                r.send(body);
            });
        }
    }
    /**
     * Returns a Promise that resolves to v. If v is already a promise, just return it.
     */
    function resolve(v) {
        if (v && typeof v.then === 'function') {
            return v;
        }
        return Promise.resolve(v);
    }
    /**
     * daysFromNow returns the current time, days in the future.
     */
    function daysFromNow(days) {
        return new Date(new Date().getTime() + days * 86400 * 1000);
    }
    /**
     * apiFromKey returns the likely API URL based on the key.
     */
    function apiFromKey(key) {
        const defaultAPI = 'https://live.ravelin.click';
        if (!key || key.substring(0, 16) !== 'publishable_key_') {
            return defaultAPI;
        }
        const words = key.substring(16).split('_');
        if (words.length < 2) {
            return defaultAPI;
        }
        const env = words[words.length - 2];
        if (env === 'test' || env === 'live') {
            return defaultAPI;
        }
        return 'https://' + encodeURIComponent(env) + '.ravelin.click';
    }

    // @ts-nocheck
    const RSAKey = (function () {
        // prng4.js - uses Arcfour as a PRNG
        function Arcfour() {
            this.i = 0;
            this.j = 0;
            this.S = new Array();
        }
        // Initialize arcfour context from key, an array of ints, each from [0..255]
        function ARC4init(key) {
            var i, j, t;
            for (i = 0; i < 256; ++i)
                this.S[i] = i;
            j = 0;
            for (i = 0; i < 256; ++i) {
                j = (j + this.S[i] + key[i % key.length]) & 255;
                t = this.S[i];
                this.S[i] = this.S[j];
                this.S[j] = t;
            }
            this.i = 0;
            this.j = 0;
        }
        function ARC4next() {
            var t;
            this.i = (this.i + 1) & 255;
            this.j = (this.j + this.S[this.i]) & 255;
            t = this.S[this.i];
            this.S[this.i] = this.S[this.j];
            this.S[this.j] = t;
            return this.S[(t + this.S[this.i]) & 255];
        }
        Arcfour.prototype.init = ARC4init;
        Arcfour.prototype.next = ARC4next;
        // Plug in your RNG constructor here
        function prng_newstate() {
            return new Arcfour();
        }
        // Pool size must be a multiple of 4 and greater than 32.
        // An array of bytes the size of the pool will be passed to init()
        var rng_psize = 256;
        // Random number generator - requires a PRNG backend, e.g. prng4.js
        // For best results, put code like
        // <body onClick='rng_seed_time();' onKeyPress='rng_seed_time();'>
        // in your main HTML document.
        var rng_state;
        var rng_pool;
        var rng_pptr;
        // Mix in a 32-bit integer into the pool
        function rng_seed_int(x) {
            rng_pool[rng_pptr++] ^= x & 255;
            rng_pool[rng_pptr++] ^= (x >> 8) & 255;
            rng_pool[rng_pptr++] ^= (x >> 16) & 255;
            rng_pool[rng_pptr++] ^= (x >> 24) & 255;
            if (rng_pptr >= rng_psize)
                rng_pptr -= rng_psize;
        }
        // Mix in the current time (w/milliseconds) into the pool
        function rng_seed_time() {
            rng_seed_int(new Date().getTime());
        }
        // Initialize the pool with junk if needed.
        if (rng_pool == null) {
            rng_pool = new Array();
            rng_pptr = 0;
            var t;
            if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
                // Use webcrypto if available
                var ua = new Uint8Array(32);
                window.crypto.getRandomValues(ua);
                for (t = 0; t < 32; ++t)
                    rng_pool[rng_pptr++] = ua[t];
            }
            if (typeof navigator !== 'undefined' && navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto && window.crypto.random) {
                // Extract entropy (256 bits) from NS4 RNG if available
                var z = window.crypto.random(32);
                for (t = 0; t < z.length; ++t)
                    rng_pool[rng_pptr++] = z.charCodeAt(t) & 255;
            }
            while (rng_pptr < rng_psize) { // extract some randomness from Math.random()
                t = Math.floor(65536 * Math.random());
                rng_pool[rng_pptr++] = t >>> 8;
                rng_pool[rng_pptr++] = t & 255;
            }
            rng_pptr = 0;
            rng_seed_time();
            //rng_seed_int(window.screenX);
            //rng_seed_int(window.screenY);
        }
        function rng_get_byte() {
            if (rng_state == null) {
                rng_seed_time();
                rng_state = prng_newstate();
                rng_state.init(rng_pool);
                for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)
                    rng_pool[rng_pptr] = 0;
                rng_pptr = 0;
                //rng_pool = null;
            }
            // TODO: allow reseeding after first request
            return rng_state.next();
        }
        function rng_get_bytes(ba) {
            var i;
            for (i = 0; i < ba.length; ++i)
                ba[i] = rng_get_byte();
        }
        function SecureRandom() { }
        SecureRandom.prototype.nextBytes = rng_get_bytes;
        // Copyright (c) 2005  Tom Wu
        // All Rights Reserved.
        // See "LICENSE" for details.
        // Basic JavaScript BN library - subset useful for RSA encryption.
        // Bits per digit
        var dbits;
        // (public) Constructor
        function BigInteger(a, b, c) {
            if (a != null)
                if ("number" == typeof a)
                    this.fromNumber(a, b, c);
                else if (b == null && "string" != typeof a)
                    this.fromString(a, 256);
                else
                    this.fromString(a, b);
        }
        // return new, unset BigInteger
        function nbi() { return new BigInteger(null); }
        // am: Compute w_j += (x*this_i), propagate carries,
        // c is initial carry, returns final carry.
        // c < 3*dvalue, x < 2*dvalue, this_i < dvalue
        // We need to select the fastest one that works in this environment.
        // am1: use a single mult and divide to get the high bits,
        // max digit bits should be 26 because
        // max internal value = 2*dvalue^2-2*dvalue (< 2^53)
        function am1(i, x, w, j, c, n) {
            while (--n >= 0) {
                var v = x * this[i++] + w[j] + c;
                c = Math.floor(v / 0x4000000);
                w[j++] = v & 0x3ffffff;
            }
            return c;
        }
        // am2 avoids a big mult-and-extract completely.
        // Max digit bits should be <= 30 because we do bitwise ops
        // on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
        function am2(i, x, w, j, c, n) {
            var xl = x & 0x7fff, xh = x >> 15;
            while (--n >= 0) {
                var l = this[i] & 0x7fff;
                var h = this[i++] >> 15;
                var m = xh * l + h * xl;
                l = xl * l + ((m & 0x7fff) << 15) + w[j] + (c & 0x3fffffff);
                c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
                w[j++] = l & 0x3fffffff;
            }
            return c;
        }
        // Alternately, set max digit bits to 28 since some
        // browsers slow down when dealing with 32-bit numbers.
        function am3(i, x, w, j, c, n) {
            var xl = x & 0x3fff, xh = x >> 14;
            while (--n >= 0) {
                var l = this[i] & 0x3fff;
                var h = this[i++] >> 14;
                var m = xh * l + h * xl;
                l = xl * l + ((m & 0x3fff) << 14) + w[j] + c;
                c = (l >> 28) + (m >> 14) + xh * h;
                w[j++] = l & 0xfffffff;
            }
            return c;
        }
        if ((typeof navigator !== 'undefined' && navigator.appName == "Microsoft Internet Explorer")) {
            BigInteger.prototype.am = am2;
            dbits = 30;
        }
        else if ((typeof navigator !== 'undefined' && navigator.appName != "Netscape")) {
            BigInteger.prototype.am = am1;
            dbits = 26;
        }
        else { // Mozilla/Netscape seems to prefer am3
            BigInteger.prototype.am = am3;
            dbits = 28;
        }
        BigInteger.prototype.DB = dbits;
        BigInteger.prototype.DM = ((1 << dbits) - 1);
        BigInteger.prototype.DV = (1 << dbits);
        var BI_FP = 52;
        BigInteger.prototype.FV = Math.pow(2, BI_FP);
        BigInteger.prototype.F1 = BI_FP - dbits;
        BigInteger.prototype.F2 = 2 * dbits - BI_FP;
        // Digit conversions
        var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
        var BI_RC = new Array();
        var rr, vv;
        rr = "0".charCodeAt(0);
        for (vv = 0; vv <= 9; ++vv)
            BI_RC[rr++] = vv;
        rr = "a".charCodeAt(0);
        for (vv = 10; vv < 36; ++vv)
            BI_RC[rr++] = vv;
        rr = "A".charCodeAt(0);
        for (vv = 10; vv < 36; ++vv)
            BI_RC[rr++] = vv;
        function int2char(n) { return BI_RM.charAt(n); }
        function intAt(s, i) {
            var c = BI_RC[s.charCodeAt(i)];
            return (c == null) ? -1 : c;
        }
        // (protected) copy this to r
        function bnpCopyTo(r) {
            for (var i = this.t - 1; i >= 0; --i)
                r[i] = this[i];
            r.t = this.t;
            r.s = this.s;
        }
        // (protected) set from integer value x, -DV <= x < DV
        function bnpFromInt(x) {
            this.t = 1;
            this.s = (x < 0) ? -1 : 0;
            if (x > 0)
                this[0] = x;
            else if (x < -1)
                this[0] = x + this.DV;
            else
                this.t = 0;
        }
        // return bigint initialized to value
        function nbv(i) { var r = nbi(); r.fromInt(i); return r; }
        // (protected) set from string and radix
        function bnpFromString(s, b) {
            var k;
            if (b == 16)
                k = 4;
            else if (b == 8)
                k = 3;
            else if (b == 256)
                k = 8; // byte array
            else if (b == 2)
                k = 1;
            else if (b == 32)
                k = 5;
            else if (b == 4)
                k = 2;
            else {
                this.fromRadix(s, b);
                return;
            }
            this.t = 0;
            this.s = 0;
            var i = s.length, mi = false, sh = 0;
            while (--i >= 0) {
                var x = (k == 8) ? s[i] & 0xff : intAt(s, i);
                if (x < 0) {
                    if (s.charAt(i) == "-")
                        mi = true;
                    continue;
                }
                mi = false;
                if (sh == 0)
                    this[this.t++] = x;
                else if (sh + k > this.DB) {
                    this[this.t - 1] |= (x & ((1 << (this.DB - sh)) - 1)) << sh;
                    this[this.t++] = (x >> (this.DB - sh));
                }
                else
                    this[this.t - 1] |= x << sh;
                sh += k;
                if (sh >= this.DB)
                    sh -= this.DB;
            }
            if (k == 8 && (s[0] & 0x80) != 0) {
                this.s = -1;
                if (sh > 0)
                    this[this.t - 1] |= ((1 << (this.DB - sh)) - 1) << sh;
            }
            this.clamp();
            if (mi)
                BigInteger.ZERO.subTo(this, this);
        }
        // (protected) clamp off excess high words
        function bnpClamp() {
            var c = this.s & this.DM;
            while (this.t > 0 && this[this.t - 1] == c)
                --this.t;
        }
        // (public) return string representation in given radix
        function bnToString(b) {
            if (this.s < 0)
                return "-" + this.negate().toString(b);
            var k;
            if (b == 16)
                k = 4;
            else if (b == 8)
                k = 3;
            else if (b == 2)
                k = 1;
            else if (b == 32)
                k = 5;
            else if (b == 4)
                k = 2;
            else
                return this.toRadix(b);
            var km = (1 << k) - 1, d, m = false, r = "", i = this.t;
            var p = this.DB - (i * this.DB) % k;
            if (i-- > 0) {
                if (p < this.DB && (d = this[i] >> p) > 0) {
                    m = true;
                    r = int2char(d);
                }
                while (i >= 0) {
                    if (p < k) {
                        d = (this[i] & ((1 << p) - 1)) << (k - p);
                        d |= this[--i] >> (p += this.DB - k);
                    }
                    else {
                        d = (this[i] >> (p -= k)) & km;
                        if (p <= 0) {
                            p += this.DB;
                            --i;
                        }
                    }
                    if (d > 0)
                        m = true;
                    if (m)
                        r += int2char(d);
                }
            }
            return m ? r : "0";
        }
        // (public) -this
        function bnNegate() { var r = nbi(); BigInteger.ZERO.subTo(this, r); return r; }
        // (public) |this|
        function bnAbs() { return (this.s < 0) ? this.negate() : this; }
        // (public) return + if this > a, - if this < a, 0 if equal
        function bnCompareTo(a) {
            var r = this.s - a.s;
            if (r != 0)
                return r;
            var i = this.t;
            r = i - a.t;
            if (r != 0)
                return (this.s < 0) ? -r : r;
            while (--i >= 0)
                if ((r = this[i] - a[i]) != 0)
                    return r;
            return 0;
        }
        // returns bit length of the integer x
        function nbits(x) {
            var r = 1, t;
            if ((t = x >>> 16) != 0) {
                x = t;
                r += 16;
            }
            if ((t = x >> 8) != 0) {
                x = t;
                r += 8;
            }
            if ((t = x >> 4) != 0) {
                x = t;
                r += 4;
            }
            if ((t = x >> 2) != 0) {
                x = t;
                r += 2;
            }
            if ((t = x >> 1) != 0) {
                x = t;
                r += 1;
            }
            return r;
        }
        // (public) return the number of bits in "this"
        function bnBitLength() {
            if (this.t <= 0)
                return 0;
            return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ (this.s & this.DM));
        }
        // (protected) r = this << n*DB
        function bnpDLShiftTo(n, r) {
            var i;
            for (i = this.t - 1; i >= 0; --i)
                r[i + n] = this[i];
            for (i = n - 1; i >= 0; --i)
                r[i] = 0;
            r.t = this.t + n;
            r.s = this.s;
        }
        // (protected) r = this >> n*DB
        function bnpDRShiftTo(n, r) {
            for (var i = n; i < this.t; ++i)
                r[i - n] = this[i];
            r.t = Math.max(this.t - n, 0);
            r.s = this.s;
        }
        // (protected) r = this << n
        function bnpLShiftTo(n, r) {
            var bs = n % this.DB;
            var cbs = this.DB - bs;
            var bm = (1 << cbs) - 1;
            var ds = Math.floor(n / this.DB), c = (this.s << bs) & this.DM, i;
            for (i = this.t - 1; i >= 0; --i) {
                r[i + ds + 1] = (this[i] >> cbs) | c;
                c = (this[i] & bm) << bs;
            }
            for (i = ds - 1; i >= 0; --i)
                r[i] = 0;
            r[ds] = c;
            r.t = this.t + ds + 1;
            r.s = this.s;
            r.clamp();
        }
        // (protected) r = this >> n
        function bnpRShiftTo(n, r) {
            r.s = this.s;
            var ds = Math.floor(n / this.DB);
            if (ds >= this.t) {
                r.t = 0;
                return;
            }
            var bs = n % this.DB;
            var cbs = this.DB - bs;
            var bm = (1 << bs) - 1;
            r[0] = this[ds] >> bs;
            for (var i = ds + 1; i < this.t; ++i) {
                r[i - ds - 1] |= (this[i] & bm) << cbs;
                r[i - ds] = this[i] >> bs;
            }
            if (bs > 0)
                r[this.t - ds - 1] |= (this.s & bm) << cbs;
            r.t = this.t - ds;
            r.clamp();
        }
        // (protected) r = this - a
        function bnpSubTo(a, r) {
            var i = 0, c = 0, m = Math.min(a.t, this.t);
            while (i < m) {
                c += this[i] - a[i];
                r[i++] = c & this.DM;
                c >>= this.DB;
            }
            if (a.t < this.t) {
                c -= a.s;
                while (i < this.t) {
                    c += this[i];
                    r[i++] = c & this.DM;
                    c >>= this.DB;
                }
                c += this.s;
            }
            else {
                c += this.s;
                while (i < a.t) {
                    c -= a[i];
                    r[i++] = c & this.DM;
                    c >>= this.DB;
                }
                c -= a.s;
            }
            r.s = (c < 0) ? -1 : 0;
            if (c < -1)
                r[i++] = this.DV + c;
            else if (c > 0)
                r[i++] = c;
            r.t = i;
            r.clamp();
        }
        // (protected) r = this * a, r != this,a (HAC 14.12)
        // "this" should be the larger one if appropriate.
        function bnpMultiplyTo(a, r) {
            var x = this.abs(), y = a.abs();
            var i = x.t;
            r.t = i + y.t;
            while (--i >= 0)
                r[i] = 0;
            for (i = 0; i < y.t; ++i)
                r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
            r.s = 0;
            r.clamp();
            if (this.s != a.s)
                BigInteger.ZERO.subTo(r, r);
        }
        // (protected) r = this^2, r != this (HAC 14.16)
        function bnpSquareTo(r) {
            var x = this.abs();
            var i = r.t = 2 * x.t;
            while (--i >= 0)
                r[i] = 0;
            for (i = 0; i < x.t - 1; ++i) {
                var c = x.am(i, x[i], r, 2 * i, 0, 1);
                if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
                    r[i + x.t] -= x.DV;
                    r[i + x.t + 1] = 1;
                }
            }
            if (r.t > 0)
                r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
            r.s = 0;
            r.clamp();
        }
        // (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
        // r != q, this != m.  q or r may be null.
        function bnpDivRemTo(m, q, r) {
            var pm = m.abs();
            if (pm.t <= 0)
                return;
            var pt = this.abs();
            if (pt.t < pm.t) {
                if (q != null)
                    q.fromInt(0);
                if (r != null)
                    this.copyTo(r);
                return;
            }
            if (r == null)
                r = nbi();
            var y = nbi(), ts = this.s, ms = m.s;
            var nsh = this.DB - nbits(pm[pm.t - 1]); // normalize modulus
            if (nsh > 0) {
                pm.lShiftTo(nsh, y);
                pt.lShiftTo(nsh, r);
            }
            else {
                pm.copyTo(y);
                pt.copyTo(r);
            }
            var ys = y.t;
            var y0 = y[ys - 1];
            if (y0 == 0)
                return;
            var yt = y0 * (1 << this.F1) + ((ys > 1) ? y[ys - 2] >> this.F2 : 0);
            var d1 = this.FV / yt, d2 = (1 << this.F1) / yt, e = 1 << this.F2;
            var i = r.t, j = i - ys, t = (q == null) ? nbi() : q;
            y.dlShiftTo(j, t);
            if (r.compareTo(t) >= 0) {
                r[r.t++] = 1;
                r.subTo(t, r);
            }
            BigInteger.ONE.dlShiftTo(ys, t);
            t.subTo(y, y); // "negative" y so we can replace sub with am later
            while (y.t < ys)
                y[y.t++] = 0;
            while (--j >= 0) {
                // Estimate quotient digit
                var qd = (r[--i] == y0) ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
                if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) { // Try it out
                    y.dlShiftTo(j, t);
                    r.subTo(t, r);
                    while (r[i] < --qd)
                        r.subTo(t, r);
                }
            }
            if (q != null) {
                r.drShiftTo(ys, q);
                if (ts != ms)
                    BigInteger.ZERO.subTo(q, q);
            }
            r.t = ys;
            r.clamp();
            if (nsh > 0)
                r.rShiftTo(nsh, r); // Denormalize remainder
            if (ts < 0)
                BigInteger.ZERO.subTo(r, r);
        }
        // (public) this mod a
        function bnMod(a) {
            var r = nbi();
            this.abs().divRemTo(a, null, r);
            if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0)
                a.subTo(r, r);
            return r;
        }
        // Modular reduction using "classic" algorithm
        function Classic(m) { this.m = m; }
        function cConvert(x) {
            if (x.s < 0 || x.compareTo(this.m) >= 0)
                return x.mod(this.m);
            else
                return x;
        }
        function cRevert(x) { return x; }
        function cReduce(x) { x.divRemTo(this.m, null, x); }
        function cMulTo(x, y, r) { x.multiplyTo(y, r); this.reduce(r); }
        function cSqrTo(x, r) { x.squareTo(r); this.reduce(r); }
        Classic.prototype.convert = cConvert;
        Classic.prototype.revert = cRevert;
        Classic.prototype.reduce = cReduce;
        Classic.prototype.mulTo = cMulTo;
        Classic.prototype.sqrTo = cSqrTo;
        // (protected) return "-1/this % 2^DB"; useful for Mont. reduction
        // justification:
        //         xy == 1 (mod m)
        //         xy =  1+km
        //   xy(2-xy) = (1+km)(1-km)
        // x[y(2-xy)] = 1-k^2m^2
        // x[y(2-xy)] == 1 (mod m^2)
        // if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
        // should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
        // JS multiply "overflows" differently from C/C++, so care is needed here.
        function bnpInvDigit() {
            if (this.t < 1)
                return 0;
            var x = this[0];
            if ((x & 1) == 0)
                return 0;
            var y = x & 3; // y == 1/x mod 2^2
            y = (y * (2 - (x & 0xf) * y)) & 0xf; // y == 1/x mod 2^4
            y = (y * (2 - (x & 0xff) * y)) & 0xff; // y == 1/x mod 2^8
            y = (y * (2 - (((x & 0xffff) * y) & 0xffff))) & 0xffff; // y == 1/x mod 2^16
            // last step - calculate inverse mod DV directly;
            // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
            y = (y * (2 - x * y % this.DV)) % this.DV; // y == 1/x mod 2^dbits
            // we really want the negative inverse, and -DV < y < DV
            return (y > 0) ? this.DV - y : -y;
        }
        // Montgomery reduction
        function Montgomery(m) {
            this.m = m;
            this.mp = m.invDigit();
            this.mpl = this.mp & 0x7fff;
            this.mph = this.mp >> 15;
            this.um = (1 << (m.DB - 15)) - 1;
            this.mt2 = 2 * m.t;
        }
        // xR mod m
        function montConvert(x) {
            var r = nbi();
            x.abs().dlShiftTo(this.m.t, r);
            r.divRemTo(this.m, null, r);
            if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0)
                this.m.subTo(r, r);
            return r;
        }
        // x/R mod m
        function montRevert(x) {
            var r = nbi();
            x.copyTo(r);
            this.reduce(r);
            return r;
        }
        // x = x/R mod m (HAC 14.32)
        function montReduce(x) {
            while (x.t <= this.mt2) // pad x so am has enough room later
                x[x.t++] = 0;
            for (var i = 0; i < this.m.t; ++i) {
                // faster way of calculating u0 = x[i]*mp mod DV
                var j = x[i] & 0x7fff;
                var u0 = (j * this.mpl + (((j * this.mph + (x[i] >> 15) * this.mpl) & this.um) << 15)) & x.DM;
                // use am to combine the multiply-shift-add into one call
                j = i + this.m.t;
                x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
                // propagate carry
                while (x[j] >= x.DV) {
                    x[j] -= x.DV;
                    x[++j]++;
                }
            }
            x.clamp();
            x.drShiftTo(this.m.t, x);
            if (x.compareTo(this.m) >= 0)
                x.subTo(this.m, x);
        }
        // r = "x^2/R mod m"; x != r
        function montSqrTo(x, r) { x.squareTo(r); this.reduce(r); }
        // r = "xy/R mod m"; x,y != r
        function montMulTo(x, y, r) { x.multiplyTo(y, r); this.reduce(r); }
        Montgomery.prototype.convert = montConvert;
        Montgomery.prototype.revert = montRevert;
        Montgomery.prototype.reduce = montReduce;
        Montgomery.prototype.mulTo = montMulTo;
        Montgomery.prototype.sqrTo = montSqrTo;
        // (protected) true iff this is even
        function bnpIsEven() { return ((this.t > 0) ? (this[0] & 1) : this.s) == 0; }
        // (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
        function bnpExp(e, z) {
            if (e > 0xffffffff || e < 1)
                return BigInteger.ONE;
            var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e) - 1;
            g.copyTo(r);
            while (--i >= 0) {
                z.sqrTo(r, r2);
                if ((e & (1 << i)) > 0)
                    z.mulTo(r2, g, r);
                else {
                    var t = r;
                    r = r2;
                    r2 = t;
                }
            }
            return z.revert(r);
        }
        // (public) this^e % m, 0 <= e < 2^32
        function bnModPowInt(e, m) {
            var z;
            if (e < 256 || m.isEven())
                z = new Classic(m);
            else
                z = new Montgomery(m);
            return this.exp(e, z);
        }
        // protected
        BigInteger.prototype.copyTo = bnpCopyTo;
        BigInteger.prototype.fromInt = bnpFromInt;
        BigInteger.prototype.fromString = bnpFromString;
        BigInteger.prototype.clamp = bnpClamp;
        BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
        BigInteger.prototype.drShiftTo = bnpDRShiftTo;
        BigInteger.prototype.lShiftTo = bnpLShiftTo;
        BigInteger.prototype.rShiftTo = bnpRShiftTo;
        BigInteger.prototype.subTo = bnpSubTo;
        BigInteger.prototype.multiplyTo = bnpMultiplyTo;
        BigInteger.prototype.squareTo = bnpSquareTo;
        BigInteger.prototype.divRemTo = bnpDivRemTo;
        BigInteger.prototype.invDigit = bnpInvDigit;
        BigInteger.prototype.isEven = bnpIsEven;
        BigInteger.prototype.exp = bnpExp;
        // public
        BigInteger.prototype.toString = bnToString;
        BigInteger.prototype.negate = bnNegate;
        BigInteger.prototype.abs = bnAbs;
        BigInteger.prototype.compareTo = bnCompareTo;
        BigInteger.prototype.bitLength = bnBitLength;
        BigInteger.prototype.mod = bnMod;
        BigInteger.prototype.modPowInt = bnModPowInt;
        // "constants"
        BigInteger.ZERO = nbv(0);
        BigInteger.ONE = nbv(1);
        // rsa.js
        // Modified: alerts have been removed!
        // Depends on jsbn.js and rng.js
        // Version 1.1: support utf-8 encoding in pkcs1pad2
        // convert a (hex) string to a bignum object
        function parseBigInt(str, r) {
            return new BigInteger(str, r);
        }
        // PKCS#1 (type 2, random) pad input string s to n bytes, and return a bigint
        function pkcs1pad2(s, n) {
            if (n < s.length + 11) { // TODO: fix for utf-8
                return null;
            }
            var ba = new Array();
            var i = s.length - 1;
            while (i >= 0 && n > 0) {
                var c = s.charCodeAt(i--);
                if (c < 128) { // encode using utf-8
                    ba[--n] = c;
                }
                else if ((c > 127) && (c < 2048)) {
                    ba[--n] = (c & 63) | 128;
                    ba[--n] = (c >> 6) | 192;
                }
                else {
                    ba[--n] = (c & 63) | 128;
                    ba[--n] = ((c >> 6) & 63) | 128;
                    ba[--n] = (c >> 12) | 224;
                }
            }
            ba[--n] = 0;
            var rng = new SecureRandom();
            var x = new Array();
            while (n > 2) { // random non-zero pad
                x[0] = 0;
                while (x[0] == 0)
                    rng.nextBytes(x);
                ba[--n] = x[0];
            }
            ba[--n] = 2;
            ba[--n] = 0;
            return new BigInteger(ba);
        }
        // "empty" RSA key constructor
        function RSAKey() {
            this.n = null;
            this.e = 0;
            this.d = null;
            this.p = null;
            this.q = null;
            this.dmp1 = null;
            this.dmq1 = null;
            this.coeff = null;
        }
        // Set the public key fields N and e from hex strings
        function RSASetPublic(N, E) {
            if (N != null && E != null && N.length > 0 && E.length > 0) {
                this.n = parseBigInt(N, 16);
                this.e = parseInt(E, 16);
            }
        }
        // Perform raw public operation on "x": return x^e (mod n)
        function RSADoPublic(x) {
            return x.modPowInt(this.e, this.n);
        }
        // Return the PKCS#1 RSA encryption of "text" as an even-length hex string
        function RSAEncrypt(text) {
            var m = pkcs1pad2(text, (this.n.bitLength() + 7) >> 3);
            if (m == null)
                return null;
            var c = this.doPublic(m);
            if (c == null)
                return null;
            var h = c.toString(16);
            if ((h.length & 1) == 0)
                return h;
            else
                return "0" + h;
        }
        // protected
        RSAKey.prototype.doPublic = RSADoPublic;
        // public
        RSAKey.prototype.setPublic = RSASetPublic;
        RSAKey.prototype.encrypt = RSAEncrypt;
        return RSAKey;
    })();
    // sjcl.js
    //
    // https://github.com/bitwiseshiftleft/sjcl/blob/master/sjcl.js
    // ec1162f7ce686e489c471d1d13772ebfda35623b
    const sjcl = { cipher: {}, hash: {}, keyexchange: {}, mode: {}, misc: {}, codec: {}, exception: { corrupt: function (a) { this.toString = function () { return "CORRUPT: " + this.message; }; this.message = a; }, invalid: function (a) { this.toString = function () { return "INVALID: " + this.message; }; this.message = a; }, bug: function (a) { this.toString = function () { return "BUG: " + this.message; }; this.message = a; }, notReady: function (a) { this.toString = function () { return "NOT READY: " + this.message; }; this.message = a; } } };
    sjcl.cipher.aes = function (a) {
        this.s[0][0][0] || this.O();
        var b, c, d, e, f = this.s[0][4], g = this.s[1];
        b = a.length;
        var h = 1;
        if (4 !== b && 6 !== b && 8 !== b)
            throw new sjcl.exception.invalid("invalid aes key size");
        this.b = [d = a.slice(0), e = []];
        for (a = b; a < 4 * b + 28; a++) {
            c = d[a - 1];
            if (0 === a % b || 8 === b && 4 === a % b)
                c = f[c >>> 24] << 24 ^ f[c >> 16 & 255] << 16 ^ f[c >> 8 & 255] << 8 ^ f[c & 255], 0 === a % b && (c = c << 8 ^ c >>> 24 ^ h << 24, h = h << 1 ^ 283 * (h >> 7));
            d[a] = d[a - b] ^ c;
        }
        for (b = 0; a; b++, a--)
            c = d[b & 3 ? a : a - 4], e[b] = 4 >= a || 4 > b ? c : g[0][f[c >>> 24]] ^ g[1][f[c >> 16 & 255]] ^ g[2][f[c >> 8 & 255]] ^ g[3][f[c &
                255]];
    };
    sjcl.cipher.aes.prototype = { encrypt: function (a) { return t(this, a, 0); }, decrypt: function (a) { return t(this, a, 1); }, s: [[[], [], [], [], []], [[], [], [], [], []]], O: function () {
            var a = this.s[0], b = this.s[1], c = a[4], d = b[4], e, f, g, h = [], k = [], l, n, m, p;
            for (e = 0; 0x100 > e; e++)
                k[(h[e] = e << 1 ^ 283 * (e >> 7)) ^ e] = e;
            for (f = g = 0; !c[f]; f ^= l || 1, g = k[g] || 1)
                for (m = g ^ g << 1 ^ g << 2 ^ g << 3 ^ g << 4, m = m >> 8 ^ m & 255 ^ 99, c[f] = m, d[m] = f, n = h[e = h[l = h[f]]], p = 0x1010101 * n ^ 0x10001 * e ^ 0x101 * l ^ 0x1010100 * f, n = 0x101 * h[m] ^ 0x1010100 * m, e = 0; 4 > e; e++)
                    a[e][f] = n = n << 24 ^ n >>> 8, b[e][m] = p = p << 24 ^ p >>> 8;
            for (e =
                0; 5 > e; e++)
                a[e] = a[e].slice(0), b[e] = b[e].slice(0);
        } };
    function t(a, b, c) {
        if (4 !== b.length)
            throw new sjcl.exception.invalid("invalid aes block size");
        var d = a.b[c], e = b[0] ^ d[0], f = b[c ? 3 : 1] ^ d[1], g = b[2] ^ d[2];
        b = b[c ? 1 : 3] ^ d[3];
        var h, k, l, n = d.length / 4 - 2, m, p = 4, r = [0, 0, 0, 0];
        h = a.s[c];
        a = h[0];
        var q = h[1], v = h[2], w = h[3], x = h[4];
        for (m = 0; m < n; m++)
            h = a[e >>> 24] ^ q[f >> 16 & 255] ^ v[g >> 8 & 255] ^ w[b & 255] ^ d[p], k = a[f >>> 24] ^ q[g >> 16 & 255] ^ v[b >> 8 & 255] ^ w[e & 255] ^ d[p + 1], l = a[g >>> 24] ^ q[b >> 16 & 255] ^ v[e >> 8 & 255] ^ w[f & 255] ^ d[p + 2], b = a[b >>> 24] ^ q[e >> 16 & 255] ^ v[f >> 8 & 255] ^ w[g & 255] ^ d[p + 3], p += 4, e = h, f = k, g = l;
        for (m =
            0; 4 > m; m++)
            r[c ? 3 & -m : m] = x[e >>> 24] << 24 ^ x[f >> 16 & 255] << 16 ^ x[g >> 8 & 255] << 8 ^ x[b & 255] ^ d[p++], h = e, e = f, f = g, g = b, b = h;
        return r;
    }
    sjcl.bitArray = { bitSlice: function (a, b, c) { a = sjcl.bitArray.$(a.slice(b / 32), 32 - (b & 31)).slice(1); return void 0 === c ? a : sjcl.bitArray.clamp(a, c - b); }, extract: function (a, b, c) { var d = Math.floor(-b - c & 31); return ((b + c - 1 ^ b) & -32 ? a[b / 32 | 0] << 32 - d ^ a[b / 32 + 1 | 0] >>> d : a[b / 32 | 0] >>> d) & (1 << c) - 1; }, concat: function (a, b) { if (0 === a.length || 0 === b.length)
            return a.concat(b); var c = a[a.length - 1], d = sjcl.bitArray.getPartial(c); return 32 === d ? a.concat(b) : sjcl.bitArray.$(b, d, c | 0, a.slice(0, a.length - 1)); }, bitLength: function (a) {
            var b = a.length;
            return 0 ===
                b ? 0 : 32 * (b - 1) + sjcl.bitArray.getPartial(a[b - 1]);
        }, clamp: function (a, b) { if (32 * a.length < b)
            return a; a = a.slice(0, Math.ceil(b / 32)); var c = a.length; b = b & 31; 0 < c && b && (a[c - 1] = sjcl.bitArray.partial(b, a[c - 1] & 2147483648 >> b - 1, 1)); return a; }, partial: function (a, b, c) { return 32 === a ? b : (c ? b | 0 : b << 32 - a) + 0x10000000000 * a; }, getPartial: function (a) { return Math.round(a / 0x10000000000) || 32; }, equal: function (a, b) {
            if (sjcl.bitArray.bitLength(a) !== sjcl.bitArray.bitLength(b))
                return false;
            var c = 0, d;
            for (d = 0; d < a.length; d++)
                c |= a[d] ^ b[d];
            return 0 ===
                c;
        }, $: function (a, b, c, d) { var e; e = 0; for (void 0 === d && (d = []); 32 <= b; b -= 32)
            d.push(c), c = 0; if (0 === b)
            return d.concat(a); for (e = 0; e < a.length; e++)
            d.push(c | a[e] >>> b), c = a[e] << 32 - b; e = a.length ? a[a.length - 1] : 0; a = sjcl.bitArray.getPartial(e); d.push(sjcl.bitArray.partial(b + a & 31, 32 < b + a ? c : d.pop(), 1)); return d; }, i: function (a, b) { return [a[0] ^ b[0], a[1] ^ b[1], a[2] ^ b[2], a[3] ^ b[3]]; }, byteswapM: function (a) { var b, c; for (b = 0; b < a.length; ++b)
            c = a[b], a[b] = c >>> 24 | c >>> 8 & 0xff00 | (c & 0xff00) << 8 | c << 24; return a; } };
    sjcl.codec.utf8String = { fromBits: function (a) { var b = "", c = sjcl.bitArray.bitLength(a), d, e; for (d = 0; d < c / 8; d++)
            0 === (d & 3) && (e = a[d / 4]), b += String.fromCharCode(e >>> 8 >>> 8 >>> 8), e <<= 8; return decodeURIComponent(escape(b)); }, toBits: function (a) { a = unescape(encodeURIComponent(a)); var b = [], c, d = 0; for (c = 0; c < a.length; c++)
            d = d << 8 | a.charCodeAt(c), 3 === (c & 3) && (b.push(d), d = 0); c & 3 && b.push(sjcl.bitArray.partial(8 * (c & 3), d)); return b; } };
    sjcl.codec.hex = { fromBits: function (a) { var b = "", c; for (c = 0; c < a.length; c++)
            b += ((a[c] | 0) + 0xf00000000000).toString(16).substr(4); return b.substr(0, sjcl.bitArray.bitLength(a) / 4); }, toBits: function (a) { var b, c = [], d; a = a.replace(/\s|0x/g, ""); d = a.length; a = a + "00000000"; for (b = 0; b < a.length; b += 8)
            c.push(parseInt(a.substr(b, 8), 16) ^ 0); return sjcl.bitArray.clamp(c, 4 * d); } };
    sjcl.codec.base32 = { B: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", X: "0123456789ABCDEFGHIJKLMNOPQRSTUV", BITS: 32, BASE: 5, REMAINING: 27, fromBits: function (a, b, c) { var d = sjcl.codec.base32.BASE, e = sjcl.codec.base32.REMAINING, f = "", g = 0, h = sjcl.codec.base32.B, k = 0, l = sjcl.bitArray.bitLength(a); c && (h = sjcl.codec.base32.X); for (c = 0; f.length * d < l;)
            f += h.charAt((k ^ a[c] >>> g) >>> e), g < d ? (k = a[c] << d - g, g += e, c++) : (k <<= d, g -= d); for (; f.length & 7 && !b;)
            f += "="; return f; }, toBits: function (a, b) {
            a = a.replace(/\s|=/g, "").toUpperCase();
            var c = sjcl.codec.base32.BITS, d = sjcl.codec.base32.BASE, e = sjcl.codec.base32.REMAINING, f = [], g, h = 0, k = sjcl.codec.base32.B, l = 0, n, m = "base32";
            b && (k = sjcl.codec.base32.X, m = "base32hex");
            for (g = 0; g < a.length; g++) {
                n = k.indexOf(a.charAt(g));
                if (0 > n) {
                    if (!b)
                        try {
                            return sjcl.codec.base32hex.toBits(a);
                        }
                        catch (p) { }
                    throw new sjcl.exception.invalid("this isn't " + m + "!");
                }
                h > e ? (h -= e, f.push(l ^ n >>> h), l = n << c - h) : (h += d, l ^= n << c - h);
            }
            h & 56 && f.push(sjcl.bitArray.partial(h & 56, l, 1));
            return f;
        } };
    sjcl.codec.base32hex = { fromBits: function (a, b) { return sjcl.codec.base32.fromBits(a, b, 1); }, toBits: function (a) { return sjcl.codec.base32.toBits(a, 1); } };
    sjcl.codec.base64 = { B: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", fromBits: function (a, b, c) { var d = "", e = 0, f = sjcl.codec.base64.B, g = 0, h = sjcl.bitArray.bitLength(a); c && (f = f.substr(0, 62) + "-_"); for (c = 0; 6 * d.length < h;)
            d += f.charAt((g ^ a[c] >>> e) >>> 26), 6 > e ? (g = a[c] << 6 - e, e += 26, c++) : (g <<= 6, e -= 6); for (; d.length & 3 && !b;)
            d += "="; return d; }, toBits: function (a, b) {
            a = a.replace(/\s|=/g, "");
            var c = [], d, e = 0, f = sjcl.codec.base64.B, g = 0, h;
            b && (f = f.substr(0, 62) + "-_");
            for (d = 0; d < a.length; d++) {
                h = f.indexOf(a.charAt(d));
                if (0 > h)
                    throw new sjcl.exception.invalid("this isn't base64!");
                26 < e ? (e -= 26, c.push(g ^ h >>> e), g = h << 32 - e) : (e += 6, g ^= h << 32 - e);
            }
            e & 56 && c.push(sjcl.bitArray.partial(e & 56, g, 1));
            return c;
        } };
    sjcl.codec.base64url = { fromBits: function (a) { return sjcl.codec.base64.fromBits(a, 1, 1); }, toBits: function (a) { return sjcl.codec.base64.toBits(a, 1); } };
    sjcl.hash.sha256 = function (a) { this.b[0] || this.O(); a ? (this.F = a.F.slice(0), this.A = a.A.slice(0), this.l = a.l) : this.reset(); };
    sjcl.hash.sha256.hash = function (a) { return (new sjcl.hash.sha256).update(a).finalize(); };
    sjcl.hash.sha256.prototype = { blockSize: 512, reset: function () { this.F = this.Y.slice(0); this.A = []; this.l = 0; return this; }, update: function (a) {
            "string" === typeof a && (a = sjcl.codec.utf8String.toBits(a));
            var b, c = this.A = sjcl.bitArray.concat(this.A, a);
            b = this.l;
            a = this.l = b + sjcl.bitArray.bitLength(a);
            if (0x1fffffffffffff < a)
                throw new sjcl.exception.invalid("Cannot hash more than 2^53 - 1 bits");
            if ("undefined" !== typeof Uint32Array) {
                var d = new Uint32Array(c), e = 0;
                for (b = 512 + b - (512 + b & 0x1ff); b <= a; b += 512)
                    u(this, d.subarray(16 * e, 16 * (e + 1))), e += 1;
                c.splice(0, 16 * e);
            }
            else
                for (b = 512 + b - (512 + b & 0x1ff); b <= a; b += 512)
                    u(this, c.splice(0, 16));
            return this;
        }, finalize: function () { var a, b = this.A, c = this.F, b = sjcl.bitArray.concat(b, [sjcl.bitArray.partial(1, 1)]); for (a = b.length + 2; a & 15; a++)
            b.push(0); b.push(Math.floor(this.l / 0x100000000)); for (b.push(this.l | 0); b.length;)
            u(this, b.splice(0, 16)); this.reset(); return c; }, Y: [], b: [], O: function () {
            function a(a) { return 0x100000000 * (a - Math.floor(a)) | 0; }
            for (var b = 0, c = 2, d, e; 64 > b; c++) {
                e = true;
                for (d = 2; d * d <= c; d++)
                    if (0 === c % d) {
                        e =
                            false;
                        break;
                    }
                e && (8 > b && (this.Y[b] = a(Math.pow(c, .5))), this.b[b] = a(Math.pow(c, 1 / 3)), b++);
            }
        } };
    function u(a, b) {
        var c, d, e, f = a.F, g = a.b, h = f[0], k = f[1], l = f[2], n = f[3], m = f[4], p = f[5], r = f[6], q = f[7];
        for (c = 0; 64 > c; c++)
            16 > c ? d = b[c] : (d = b[c + 1 & 15], e = b[c + 14 & 15], d = b[c & 15] = (d >>> 7 ^ d >>> 18 ^ d >>> 3 ^ d << 25 ^ d << 14) + (e >>> 17 ^ e >>> 19 ^ e >>> 10 ^ e << 15 ^ e << 13) + b[c & 15] + b[c + 9 & 15] | 0), d = d + q + (m >>> 6 ^ m >>> 11 ^ m >>> 25 ^ m << 26 ^ m << 21 ^ m << 7) + (r ^ m & (p ^ r)) + g[c], q = r, r = p, p = m, m = n + d | 0, n = l, l = k, k = h, h = d + (k & l ^ n & (k ^ l)) + (k >>> 2 ^ k >>> 13 ^ k >>> 22 ^ k << 30 ^ k << 19 ^ k << 10) | 0;
        f[0] = f[0] + h | 0;
        f[1] = f[1] + k | 0;
        f[2] = f[2] + l | 0;
        f[3] = f[3] + n | 0;
        f[4] = f[4] + m | 0;
        f[5] = f[5] + p | 0;
        f[6] = f[6] + r | 0;
        f[7] =
            f[7] + q | 0;
    }
    sjcl.mode.ccm = { name: "ccm", G: [], listenProgress: function (a) { sjcl.mode.ccm.G.push(a); }, unListenProgress: function (a) { a = sjcl.mode.ccm.G.indexOf(a); -1 < a && sjcl.mode.ccm.G.splice(a, 1); }, fa: function (a) { var b = sjcl.mode.ccm.G.slice(), c; for (c = 0; c < b.length; c += 1)
            b[c](a); }, encrypt: function (a, b, c, d, e) {
            var f, g = b.slice(0), h = sjcl.bitArray, k = h.bitLength(c) / 8, l = h.bitLength(g) / 8;
            e = e || 64;
            d = d || [];
            if (7 > k)
                throw new sjcl.exception.invalid("ccm: iv must be at least 7 bytes");
            for (f = 2; 4 > f && l >>> 8 * f; f++)
                ;
            f < 15 - k && (f = 15 - k);
            c = h.clamp(c, 8 * (15 - f));
            b = sjcl.mode.ccm.V(a, b, c, d, e, f);
            g = sjcl.mode.ccm.C(a, g, c, b, e, f);
            return h.concat(g.data, g.tag);
        }, decrypt: function (a, b, c, d, e) {
            e = e || 64;
            d = d || [];
            var f = sjcl.bitArray, g = f.bitLength(c) / 8, h = f.bitLength(b), k = f.clamp(b, h - e), l = f.bitSlice(b, h - e), h = (h - e) / 8;
            if (7 > g)
                throw new sjcl.exception.invalid("ccm: iv must be at least 7 bytes");
            for (b = 2; 4 > b && h >>> 8 * b; b++)
                ;
            b < 15 - g && (b = 15 - g);
            c = f.clamp(c, 8 * (15 - b));
            k = sjcl.mode.ccm.C(a, k, c, l, e, b);
            a = sjcl.mode.ccm.V(a, k.data, c, d, e, b);
            if (!f.equal(k.tag, a))
                throw new sjcl.exception.corrupt("ccm: tag doesn't match");
            return k.data;
        }, na: function (a, b, c, d, e, f) { var g = [], h = sjcl.bitArray, k = h.i; d = [h.partial(8, (b.length ? 64 : 0) | d - 2 << 2 | f - 1)]; d = h.concat(d, c); d[3] |= e; d = a.encrypt(d); if (b.length)
            for (c = h.bitLength(b) / 8, 65279 >= c ? g = [h.partial(16, c)] : 0xffffffff >= c && (g = h.concat([h.partial(16, 65534)], [c])), g = h.concat(g, b), b = 0; b < g.length; b += 4)
                d = a.encrypt(k(d, g.slice(b, b + 4).concat([0, 0, 0]))); return d; }, V: function (a, b, c, d, e, f) {
            var g = sjcl.bitArray, h = g.i;
            e /= 8;
            if (e % 2 || 4 > e || 16 < e)
                throw new sjcl.exception.invalid("ccm: invalid tag length");
            if (0xffffffff < d.length || 0xffffffff < b.length)
                throw new sjcl.exception.bug("ccm: can't deal with 4GiB or more data");
            c = sjcl.mode.ccm.na(a, d, c, e, g.bitLength(b) / 8, f);
            for (d = 0; d < b.length; d += 4)
                c = a.encrypt(h(c, b.slice(d, d + 4).concat([0, 0, 0])));
            return g.clamp(c, 8 * e);
        }, C: function (a, b, c, d, e, f) {
            var g, h = sjcl.bitArray;
            g = h.i;
            var k = b.length, l = h.bitLength(b), n = k / 50, m = n;
            c = h.concat([h.partial(8, f - 1)], c).concat([0, 0, 0]).slice(0, 4);
            d = h.bitSlice(g(d, a.encrypt(c)), 0, e);
            if (!k)
                return { tag: d, data: [] };
            for (g = 0; g < k; g += 4)
                g > n && (sjcl.mode.ccm.fa(g /
                    k), n += m), c[3]++, e = a.encrypt(c), b[g] ^= e[0], b[g + 1] ^= e[1], b[g + 2] ^= e[2], b[g + 3] ^= e[3];
            return { tag: d, data: h.clamp(b, l) };
        } };
    sjcl.mode.ocb2 = { name: "ocb2", encrypt: function (a, b, c, d, e, f) {
            if (128 !== sjcl.bitArray.bitLength(c))
                throw new sjcl.exception.invalid("ocb iv must be 128 bits");
            var g, h = sjcl.mode.ocb2.S, k = sjcl.bitArray, l = k.i, n = [0, 0, 0, 0];
            c = h(a.encrypt(c));
            var m, p = [];
            d = d || [];
            e = e || 64;
            for (g = 0; g + 4 < b.length; g += 4)
                m = b.slice(g, g + 4), n = l(n, m), p = p.concat(l(c, a.encrypt(l(c, m)))), c = h(c);
            m = b.slice(g);
            b = k.bitLength(m);
            g = a.encrypt(l(c, [0, 0, 0, b]));
            m = k.clamp(l(m.concat([0, 0, 0]), g), b);
            n = l(n, l(m.concat([0, 0, 0]), g));
            n = a.encrypt(l(n, l(c, h(c))));
            d.length && (n = l(n, f ? d : sjcl.mode.ocb2.pmac(a, d)));
            return p.concat(k.concat(m, k.clamp(n, e)));
        }, decrypt: function (a, b, c, d, e, f) {
            if (128 !== sjcl.bitArray.bitLength(c))
                throw new sjcl.exception.invalid("ocb iv must be 128 bits");
            e = e || 64;
            var g = sjcl.mode.ocb2.S, h = sjcl.bitArray, k = h.i, l = [0, 0, 0, 0], n = g(a.encrypt(c)), m, p, r = sjcl.bitArray.bitLength(b) - e, q = [];
            d = d || [];
            for (c = 0; c + 4 < r / 32; c += 4)
                m = k(n, a.decrypt(k(n, b.slice(c, c + 4)))), l = k(l, m), q = q.concat(m), n = g(n);
            p = r - 32 * c;
            m = a.encrypt(k(n, [0, 0, 0, p]));
            m = k(m, h.clamp(b.slice(c), p).concat([0,
                0, 0]));
            l = k(l, m);
            l = a.encrypt(k(l, k(n, g(n))));
            d.length && (l = k(l, f ? d : sjcl.mode.ocb2.pmac(a, d)));
            if (!h.equal(h.clamp(l, e), h.bitSlice(b, r)))
                throw new sjcl.exception.corrupt("ocb: tag doesn't match");
            return q.concat(h.clamp(m, p));
        }, pmac: function (a, b) {
            var c, d = sjcl.mode.ocb2.S, e = sjcl.bitArray, f = e.i, g = [0, 0, 0, 0], h = a.encrypt([0, 0, 0, 0]), h = f(h, d(d(h)));
            for (c = 0; c + 4 < b.length; c += 4)
                h = d(h), g = f(g, a.encrypt(f(h, b.slice(c, c + 4))));
            c = b.slice(c);
            128 > e.bitLength(c) && (h = f(h, d(h)), c = e.concat(c, [-2147483648, 0, 0, 0]));
            g = f(g, c);
            return a.encrypt(f(d(f(h, d(h))), g));
        }, S: function (a) { return [a[0] << 1 ^ a[1] >>> 31, a[1] << 1 ^ a[2] >>> 31, a[2] << 1 ^ a[3] >>> 31, a[3] << 1 ^ 135 * (a[0] >>> 31)]; } };
    sjcl.mode.gcm = { name: "gcm", encrypt: function (a, b, c, d, e) { var f = b.slice(0); b = sjcl.bitArray; d = d || []; a = sjcl.mode.gcm.C(true, a, f, d, c, e || 128); return b.concat(a.data, a.tag); }, decrypt: function (a, b, c, d, e) { var f = b.slice(0), g = sjcl.bitArray, h = g.bitLength(f); e = e || 128; d = d || []; e <= h ? (b = g.bitSlice(f, h - e), f = g.bitSlice(f, 0, h - e)) : (b = f, f = []); a = sjcl.mode.gcm.C(false, a, f, d, c, e); if (!g.equal(a.tag, b))
            throw new sjcl.exception.corrupt("gcm: tag doesn't match"); return a.data; }, ka: function (a, b) {
            var c, d, e, f, g, h = sjcl.bitArray.i;
            e = [0, 0,
                0, 0];
            f = b.slice(0);
            for (c = 0; 128 > c; c++) {
                (d = 0 !== (a[Math.floor(c / 32)] & 1 << 31 - c % 32)) && (e = h(e, f));
                g = 0 !== (f[3] & 1);
                for (d = 3; 0 < d; d--)
                    f[d] = f[d] >>> 1 | (f[d - 1] & 1) << 31;
                f[0] >>>= 1;
                g && (f[0] ^= -520093696);
            }
            return e;
        }, j: function (a, b, c) { var d, e = c.length; b = b.slice(0); for (d = 0; d < e; d += 4)
            b[0] ^= 0xffffffff & c[d], b[1] ^= 0xffffffff & c[d + 1], b[2] ^= 0xffffffff & c[d + 2], b[3] ^= 0xffffffff & c[d + 3], b = sjcl.mode.gcm.ka(b, a); return b; }, C: function (a, b, c, d, e, f) {
            var g, h, k, l, n, m, p, r, q = sjcl.bitArray;
            m = c.length;
            p = q.bitLength(c);
            r = q.bitLength(d);
            h = q.bitLength(e);
            g = b.encrypt([0, 0, 0, 0]);
            96 === h ? (e = e.slice(0), e = q.concat(e, [1])) : (e = sjcl.mode.gcm.j(g, [0, 0, 0, 0], e), e = sjcl.mode.gcm.j(g, e, [0, 0, Math.floor(h / 0x100000000), h & 0xffffffff]));
            h = sjcl.mode.gcm.j(g, [0, 0, 0, 0], d);
            n = e.slice(0);
            d = h.slice(0);
            a || (d = sjcl.mode.gcm.j(g, h, c));
            for (l = 0; l < m; l += 4)
                n[3]++, k = b.encrypt(n), c[l] ^= k[0], c[l + 1] ^= k[1], c[l + 2] ^= k[2], c[l + 3] ^= k[3];
            c = q.clamp(c, p);
            a && (d = sjcl.mode.gcm.j(g, h, c));
            a = [Math.floor(r / 0x100000000), r & 0xffffffff, Math.floor(p / 0x100000000), p & 0xffffffff];
            d = sjcl.mode.gcm.j(g, d, a);
            k = b.encrypt(e);
            d[0] ^= k[0];
            d[1] ^= k[1];
            d[2] ^= k[2];
            d[3] ^= k[3];
            return { tag: q.bitSlice(d, 0, f), data: c };
        } };
    sjcl.misc.hmac = function (a, b) { this.W = b = b || sjcl.hash.sha256; var c = [[], []], d, e = b.prototype.blockSize / 32; this.w = [new b, new b]; a.length > e && (a = b.hash(a)); for (d = 0; d < e; d++)
        c[0][d] = a[d] ^ 909522486, c[1][d] = a[d] ^ 1549556828; this.w[0].update(c[0]); this.w[1].update(c[1]); this.R = new b(this.w[0]); };
    sjcl.misc.hmac.prototype.encrypt = sjcl.misc.hmac.prototype.mac = function (a) { if (this.aa)
        throw new sjcl.exception.invalid("encrypt on already updated hmac called!"); this.update(a); return this.digest(a); };
    sjcl.misc.hmac.prototype.reset = function () { this.R = new this.W(this.w[0]); this.aa = false; };
    sjcl.misc.hmac.prototype.update = function (a) { this.aa = true; this.R.update(a); };
    sjcl.misc.hmac.prototype.digest = function () { var a = this.R.finalize(), a = (new this.W(this.w[1])).update(a).finalize(); this.reset(); return a; };
    sjcl.misc.pbkdf2 = function (a, b, c, d, e) { c = c || 1E4; if (0 > d || 0 > c)
        throw new sjcl.exception.invalid("invalid params to pbkdf2"); "string" === typeof a && (a = sjcl.codec.utf8String.toBits(a)); "string" === typeof b && (b = sjcl.codec.utf8String.toBits(b)); e = e || sjcl.misc.hmac; a = new e(a); var f, g, h, k, l = [], n = sjcl.bitArray; for (k = 1; 32 * l.length < (d || 1); k++) {
        e = f = a.encrypt(n.concat(b, [k]));
        for (g = 1; g < c; g++)
            for (f = a.encrypt(f), h = 0; h < f.length; h++)
                e[h] ^= f[h];
        l = l.concat(e);
    } d && (l = n.clamp(l, d)); return l; };
    sjcl.prng = function (a) { this.c = [new sjcl.hash.sha256]; this.m = [0]; this.P = 0; this.H = {}; this.N = 0; this.U = {}; this.Z = this.f = this.o = this.ha = 0; this.b = [0, 0, 0, 0, 0, 0, 0, 0]; this.h = [0, 0, 0, 0]; this.L = void 0; this.M = a; this.D = false; this.K = { progress: {}, seeded: {} }; this.u = this.ga = 0; this.I = 1; this.J = 2; this.ca = 0x10000; this.T = [0, 48, 64, 96, 128, 192, 0x100, 384, 512, 768, 1024]; this.da = 3E4; this.ba = 80; };
    sjcl.prng.prototype = { randomWords: function (a, b) {
            var c = [], d;
            d = this.isReady(b);
            var e;
            if (d === this.u)
                throw new sjcl.exception.notReady("generator isn't seeded");
            if (d & this.J) {
                d = !(d & this.I);
                e = [];
                var f = 0, g;
                this.Z = e[0] = (new Date).valueOf() + this.da;
                for (g = 0; 16 > g; g++)
                    e.push(0x100000000 * Math.random() | 0);
                for (g = 0; g < this.c.length && (e = e.concat(this.c[g].finalize()), f += this.m[g], this.m[g] = 0, d || !(this.P & 1 << g)); g++)
                    ;
                this.P >= 1 << this.c.length && (this.c.push(new sjcl.hash.sha256), this.m.push(0));
                this.f -= f;
                f > this.o && (this.o =
                    f);
                this.P++;
                this.b = sjcl.hash.sha256.hash(this.b.concat(e));
                this.L = new sjcl.cipher.aes(this.b);
                for (d = 0; 4 > d && (this.h[d] = this.h[d] + 1 | 0, !this.h[d]); d++)
                    ;
            }
            for (d = 0; d < a; d += 4)
                0 === (d + 1) % this.ca && y(this), e = z(this), c.push(e[0], e[1], e[2], e[3]);
            y(this);
            return c.slice(0, a);
        }, setDefaultParanoia: function (a, b) { if (0 === a && "Setting paranoia=0 will ruin your security; use it only for testing" !== b)
            throw new sjcl.exception.invalid("Setting paranoia=0 will ruin your security; use it only for testing"); this.M = a; }, addEntropy: function (a, b, c) {
            c = c || "user";
            var d, e, f = (new Date).valueOf(), g = this.H[c], h = this.isReady(), k = 0;
            d = this.U[c];
            void 0 === d && (d = this.U[c] = this.ha++);
            void 0 === g && (g = this.H[c] = 0);
            this.H[c] = (this.H[c] + 1) % this.c.length;
            switch (typeof a) {
                case "number":
                    void 0 === b && (b = 1);
                    this.c[g].update([d, this.N++, 1, b, f, 1, a | 0]);
                    break;
                case "object":
                    c = Object.prototype.toString.call(a);
                    if ("[object Uint32Array]" === c) {
                        e = [];
                        for (c = 0; c < a.length; c++)
                            e.push(a[c]);
                        a = e;
                    }
                    else
                        for ("[object Array]" !== c && (k = 1), c = 0; c < a.length && !k; c++)
                            "number" !== typeof a[c] &&
                                (k = 1);
                    if (!k) {
                        if (void 0 === b)
                            for (c = b = 0; c < a.length; c++)
                                for (e = a[c]; 0 < e;)
                                    b++, e = e >>> 1;
                        this.c[g].update([d, this.N++, 2, b, f, a.length].concat(a));
                    }
                    break;
                case "string":
                    void 0 === b && (b = a.length);
                    this.c[g].update([d, this.N++, 3, b, f, a.length]);
                    this.c[g].update(a);
                    break;
                default: k = 1;
            }
            if (k)
                throw new sjcl.exception.bug("random: addEntropy only supports number, array of numbers or string");
            this.m[g] += b;
            this.f += b;
            h === this.u && (this.isReady() !== this.u && A("seeded", Math.max(this.o, this.f)), A("progress", this.getProgress()));
        },
        isReady: function (a) { a = this.T[void 0 !== a ? a : this.M]; return this.o && this.o >= a ? this.m[0] > this.ba && (new Date).valueOf() > this.Z ? this.J | this.I : this.I : this.f >= a ? this.J | this.u : this.u; }, getProgress: function (a) { a = this.T[a ? a : this.M]; return this.o >= a ? 1 : this.f > a ? 1 : this.f / a; }, startCollectors: function () {
            if (!this.D) {
                this.a = { loadTimeCollector: B(this, this.ma), mouseCollector: B(this, this.oa), keyboardCollector: B(this, this.la), accelerometerCollector: B(this, this.ea), touchCollector: B(this, this.qa) };
                if (window.addEventListener)
                    window.addEventListener("load", this.a.loadTimeCollector, false), window.addEventListener("mousemove", this.a.mouseCollector, false), window.addEventListener("keypress", this.a.keyboardCollector, false), window.addEventListener("devicemotion", this.a.accelerometerCollector, false), window.addEventListener("touchmove", this.a.touchCollector, false);
                else if (document.attachEvent)
                    document.attachEvent("onload", this.a.loadTimeCollector), document.attachEvent("onmousemove", this.a.mouseCollector), document.attachEvent("keypress", this.a.keyboardCollector);
                else
                    throw new sjcl.exception.bug("can't attach event");
                this.D = true;
            }
        }, stopCollectors: function () {
            this.D && (window.removeEventListener ? (window.removeEventListener("load", this.a.loadTimeCollector, false), window.removeEventListener("mousemove", this.a.mouseCollector, false), window.removeEventListener("keypress", this.a.keyboardCollector, false), window.removeEventListener("devicemotion", this.a.accelerometerCollector, false), window.removeEventListener("touchmove", this.a.touchCollector, false)) : document.detachEvent && (document.detachEvent("onload", this.a.loadTimeCollector), document.detachEvent("onmousemove", this.a.mouseCollector), document.detachEvent("keypress", this.a.keyboardCollector)), this.D = false);
        }, addEventListener: function (a, b) { this.K[a][this.ga++] = b; }, removeEventListener: function (a, b) { var c, d, e = this.K[a], f = []; for (d in e)
            e.hasOwnProperty(d) && e[d] === b && f.push(d); for (c = 0; c < f.length; c++)
            d = f[c], delete e[d]; }, la: function () { C(this, 1); }, oa: function (a) { var b, c; try {
            b = a.x || a.clientX || a.offsetX || 0, c = a.y || a.clientY || a.offsetY || 0;
        }
        catch (d) {
            c = b = 0;
        } 0 != b && 0 != c && this.addEntropy([b, c], 2, "mouse"); C(this, 0); }, qa: function (a) {
            a =
                a.touches[0] || a.changedTouches[0];
            this.addEntropy([a.pageX || a.clientX, a.pageY || a.clientY], 1, "touch");
            C(this, 0);
        }, ma: function () { C(this, 2); }, ea: function (a) { a = a.accelerationIncludingGravity.x || a.accelerationIncludingGravity.y || a.accelerationIncludingGravity.z; if (window.orientation) {
            var b = window.orientation;
            "number" === typeof b && this.addEntropy(b, 1, "accelerometer");
        } a && this.addEntropy(a, 2, "accelerometer"); C(this, 0); } };
    function A(a, b) { var c, d = sjcl.random.K[a], e = []; for (c in d)
        d.hasOwnProperty(c) && e.push(d[c]); for (c = 0; c < e.length; c++)
        e[c](b); }
    function C(a, b) { "undefined" !== typeof window && window.performance && "function" === typeof window.performance.now ? a.addEntropy(window.performance.now(), b, "loadtime") : a.addEntropy((new Date).valueOf(), b, "loadtime"); }
    function y(a) { a.b = z(a).concat(z(a)); a.L = new sjcl.cipher.aes(a.b); }
    function z(a) { for (var b = 0; 4 > b && (a.h[b] = a.h[b] + 1 | 0, !a.h[b]); b++)
        ; return a.L.encrypt(a.h); }
    function B(a, b) { return function () { b.apply(a, arguments); }; }
    sjcl.random = new sjcl.prng(6);
    a: try {
        var D, E, F, G;
        if (G = "undefined" !== typeof module && module.exports) {
            var H;
            try {
                H = __non_webpack_require__("crypto");
            }
            catch (a) {
                H = null;
            }
            G = E = H;
        }
        if (G && E.randomBytes)
            D = E.randomBytes(128), D = new Uint32Array((new Uint8Array(D)).buffer), sjcl.random.addEntropy(D, 1024, "crypto['randomBytes']");
        else if ("undefined" !== typeof window && "undefined" !== typeof Uint32Array) {
            F = new Uint32Array(32);
            if (window.crypto && window.crypto.getRandomValues)
                window.crypto.getRandomValues(F);
            else if (window.msCrypto && window.msCrypto.getRandomValues)
                window.msCrypto.getRandomValues(F);
            else
                break a;
            sjcl.random.addEntropy(F, 1024, "crypto['getRandomValues']");
        }
    }
    catch (a) {
        "undefined" !== typeof window && window.console && (console.log("There was an error collecting entropy from the browser:"), console.log(a));
    }
    sjcl.json = { defaults: { v: 1, iter: 1E4, ks: 128, ts: 64, mode: "ccm", adata: "", cipher: "aes" }, ja: function (a, b, c, d) {
            c = c || {};
            d = d || {};
            var e = sjcl.json, f = e.g({ iv: sjcl.random.randomWords(4, 0) }, e.defaults), g;
            e.g(f, c);
            c = f.adata;
            "string" === typeof f.salt && (f.salt = sjcl.codec.base64.toBits(f.salt));
            "string" === typeof f.iv && (f.iv = sjcl.codec.base64.toBits(f.iv));
            if (!sjcl.mode[f.mode] || !sjcl.cipher[f.cipher] || "string" === typeof a && 100 >= f.iter || 64 !== f.ts && 96 !== f.ts && 128 !== f.ts || 128 !== f.ks && 192 !== f.ks && 0x100 !== f.ks || 2 > f.iv.length ||
                4 < f.iv.length)
                throw new sjcl.exception.invalid("json encrypt: invalid parameters");
            "string" === typeof a ? (g = sjcl.misc.cachedPbkdf2(a, f), a = g.key.slice(0, f.ks / 32), f.salt = g.salt) : sjcl.ecc && a instanceof sjcl.ecc.elGamal.publicKey && (g = a.kem(), f.kemtag = g.tag, a = g.key.slice(0, f.ks / 32));
            "string" === typeof b && (b = sjcl.codec.utf8String.toBits(b));
            "string" === typeof c && (f.adata = c = sjcl.codec.utf8String.toBits(c));
            g = new sjcl.cipher[f.cipher](a);
            e.g(d, f);
            d.key = a;
            f.ct = "ccm" === f.mode && sjcl.arrayBuffer && sjcl.arrayBuffer.ccm &&
                b instanceof ArrayBuffer ? sjcl.arrayBuffer.ccm.encrypt(g, b, f.iv, c, f.ts) : sjcl.mode[f.mode].encrypt(g, b, f.iv, c, f.ts);
            return f;
        }, encrypt: function (a, b, c, d) { var e = sjcl.json, f = e.ja.apply(e, arguments); return e.encode(f); }, ia: function (a, b, c, d) {
            c = c || {};
            d = d || {};
            var e = sjcl.json;
            b = e.g(e.g(e.g({}, e.defaults), b), c, true);
            var f, g;
            f = b.adata;
            "string" === typeof b.salt && (b.salt = sjcl.codec.base64.toBits(b.salt));
            "string" === typeof b.iv && (b.iv = sjcl.codec.base64.toBits(b.iv));
            if (!sjcl.mode[b.mode] || !sjcl.cipher[b.cipher] || "string" ===
                typeof a && 100 >= b.iter || 64 !== b.ts && 96 !== b.ts && 128 !== b.ts || 128 !== b.ks && 192 !== b.ks && 0x100 !== b.ks || !b.iv || 2 > b.iv.length || 4 < b.iv.length)
                throw new sjcl.exception.invalid("json decrypt: invalid parameters");
            "string" === typeof a ? (g = sjcl.misc.cachedPbkdf2(a, b), a = g.key.slice(0, b.ks / 32), b.salt = g.salt) : sjcl.ecc && a instanceof sjcl.ecc.elGamal.secretKey && (a = a.unkem(sjcl.codec.base64.toBits(b.kemtag)).slice(0, b.ks / 32));
            "string" === typeof f && (f = sjcl.codec.utf8String.toBits(f));
            g = new sjcl.cipher[b.cipher](a);
            f = "ccm" ===
                b.mode && sjcl.arrayBuffer && sjcl.arrayBuffer.ccm && b.ct instanceof ArrayBuffer ? sjcl.arrayBuffer.ccm.decrypt(g, b.ct, b.iv, b.tag, f, b.ts) : sjcl.mode[b.mode].decrypt(g, b.ct, b.iv, f, b.ts);
            e.g(d, b);
            d.key = a;
            return 1 === c.raw ? f : sjcl.codec.utf8String.fromBits(f);
        }, decrypt: function (a, b, c, d) { var e = sjcl.json; return e.ia(a, e.decode(b), c, d); }, encode: function (a) {
            var b, c = "{", d = "";
            for (b in a)
                if (a.hasOwnProperty(b)) {
                    if (!b.match(/^[a-z0-9]+$/i))
                        throw new sjcl.exception.invalid("json encode: invalid property name");
                    c += d + '"' +
                        b + '":';
                    d = ",";
                    switch (typeof a[b]) {
                        case "number":
                        case "boolean":
                            c += a[b];
                            break;
                        case "string":
                            c += '"' + escape(a[b]) + '"';
                            break;
                        case "object":
                            c += '"' + sjcl.codec.base64.fromBits(a[b], 0) + '"';
                            break;
                        default: throw new sjcl.exception.bug("json encode: unsupported type");
                    }
                }
            return c + "}";
        }, decode: function (a) {
            a = a.replace(/\s/g, "");
            if (!a.match(/^\{.*\}$/))
                throw new sjcl.exception.invalid("json decode: this isn't json!");
            a = a.replace(/^\{|\}$/g, "").split(/,/);
            var b = {}, c, d;
            for (c = 0; c < a.length; c++) {
                if (!(d = a[c].match(/^\s*(?:(["']?)([a-z][a-z0-9]*)\1)\s*:\s*(?:(-?\d+)|"([a-z0-9+\/%*_.@=\-]*)"|(true|false))$/i)))
                    throw new sjcl.exception.invalid("json decode: this isn't json!");
                null != d[3] ? b[d[2]] = parseInt(d[3], 10) : null != d[4] ? b[d[2]] = d[2].match(/^(ct|adata|salt|iv)$/) ? sjcl.codec.base64.toBits(d[4]) : unescape(d[4]) : null != d[5] && (b[d[2]] = "true" === d[5]);
            }
            return b;
        }, g: function (a, b, c) { void 0 === a && (a = {}); if (void 0 === b)
            return a; for (var d in b)
            if (b.hasOwnProperty(d)) {
                if (c && void 0 !== a[d] && a[d] !== b[d])
                    throw new sjcl.exception.invalid("required parameter overridden");
                a[d] = b[d];
            } return a; }, sa: function (a, b) { var c = {}, d; for (d in a)
            a.hasOwnProperty(d) && a[d] !== b[d] && (c[d] = a[d]); return c; }, ra: function (a, b) { var c = {}, d; for (d = 0; d < b.length; d++)
            void 0 !== a[b[d]] && (c[b[d]] = a[b[d]]); return c; } };
    sjcl.encrypt = sjcl.json.encrypt;
    sjcl.decrypt = sjcl.json.decrypt;
    sjcl.misc.pa = {};
    sjcl.misc.cachedPbkdf2 = function (a, b) { var c = sjcl.misc.pa, d; b = b || {}; d = b.iter || 1E3; c = c[a] = c[a] || {}; d = c[d] = c[d] || { firstSalt: b.salt && b.salt.length ? b.salt.slice(0) : sjcl.random.randomWords(2, 0) }; c = void 0 === b.salt ? d.firstSalt : b.salt; d[c] = d[c] || sjcl.misc.pbkdf2(a, c, b.iter); return { key: d[c].slice(0), salt: c.slice(0) }; };

    /**
     * The Encrypt class provides card-encryption methods.
     */
    class Encrypt {
        core;
        key;
        /**
         * @param core The Core library instance.
         * @param cfg The encryption configuration.
         */
        constructor(core, cfg) {
            this.core = core;
            // Bind 'card' to ensure 'this' context is preserved if passed as a callback,
            // though strict class usage usually avoids this need.
            this.card = this.core.bind(this.card, this);
            if (cfg.rsaKey) {
                this.key = parseKey(cfg.rsaKey);
            }
            if (sjcl.random && sjcl.random.startCollectors) {
                sjcl.random.startCollectors();
            }
        }
        /**
         * Encrypt a card into an encrypted payment method that
         * can be sent via your server to Ravelin.
         *
         * @param card The card details to encrypt.
         * @return The encrypted payment method cipher.
         */
        card(card) {
            // Check that we've got an argument
            if (!card) {
                throw new Error('ravelin/encrypt: card is required');
            }
            // Check there are no unexpected properties on card.
            for (const prop in card) {
                if (!Object.prototype.hasOwnProperty.call(card, prop)) {
                    continue;
                }
                switch (prop) {
                    case 'rsaKey':
                    case 'pan':
                    case 'year':
                    case 'month':
                    case 'nameOnCard':
                        continue;
                    default:
                        throw new Error('ravelin/encrypt: unrecognised property ' + prop);
                }
            }
            // Parse the key
            let key = this.key;
            if (card.rsaKey) {
                if (typeof card.rsaKey !== 'string') {
                    throw new Error('ravelin/encrypt: card.rsaKey should be a string');
                }
                key = parseKey(card.rsaKey);
            }
            if (!key) {
                throw new Error('ravelin/encrypt: no rsaKey provided');
            }
            // Validate the PAN
            let pan = card.pan;
            if (pan) {
                pan = pan.toString().replace(/[^0-9]/g, '');
            }
            if (!pan || pan.length < 12) {
                throw new Error('ravelin/encrypt: card.pan should have at least 12 digits');
            }
            // Validate month is an integer or string of an integer in the range 1-12.
            let month = card.month;
            if (typeof month === 'string') {
                month = parseInt(month, 10);
            }
            if (!(month > 0 && month < 13)) {
                throw new Error('ravelin/encrypt: card.month should be in the range 1-12');
            }
            // Validate year is an integer or string of an integer in the range 1-99 or
            // 2000+. If in the range 1-99 we convert it to 2001-2099.
            let year = card.year;
            if (typeof year === 'string') {
                year = parseInt(year, 10);
            }
            if (year > 0 && year < 100) {
                year += 2000;
            }
            if (!year || year <= 2000) {
                throw new Error('ravelin/encrypt: card.year should be in the 21st century');
            }
            // AES encrypt the card details, using a uniquely generated session key and
            // IV. The GCM auth tag is appended to the ciphertext. This key and IV are
            // returned from this call as well as the card detail ciphertext,
            // all as base64.
            let aesResult;
            try {
                aesResult = aesEncrypt(JSON.stringify({
                    pan: pan,
                    year: year.toString(),
                    month: month.toString(),
                    nameOnCard: card.nameOnCard,
                }));
            }
            catch (e) {
                if (e && e.toString().indexOf('generator') !== -1) {
                    throw new Error('ravelin/encrypt: generator not ready');
                }
                throw e;
            }
            // RSA encrypt the key and IV from the previous step,
            // as a single, pipe-delimited string.
            const rsaResultB64 = rsaEncrypt(key.key, aesResult.aesKeyB64, aesResult.ivB64);
            // This payload identically matches the structure we expect
            // to be sent to the Ravelin API.
            return {
                methodType: 'paymentMethodCipher',
                cardCiphertext: aesResult.ciphertextB64,
                aesKeyCiphertext: rsaResultB64,
                algorithm: 'RSA_WITH_AES_256_GCM',
                ravelinSDKVersion: this.core.version,
                keyIndex: key.index,
                keySignature: key.sig,
            };
        }
    }
    /**
     * parseKey extracts the components of a key string ready for use.
     *
     * A client's public RSA key has a structure of either 'exponent|modulus' or
     * 'keyIndex|exponent|modulus'. The index of a key is roughly equivalent to the
     * version, with each new RSA key pair we generate for a client having an index
     * of n+1. A single client can have multiple active RSA key pairs, and we can
     * decomission a key pair as required while allowing all other active versions
     * to operate.
     *
     * The first key we issue a client is of index 0. For keys of index 0, we omit
     * this value from the key. e.g '10001|AA1C1C1EC...`
     *
     * For all keys beyond the first, the index is prefixed to key definition. e.g
     * '1|10001|BB2D2D2FD...'
     *
     * For all keys (including those of index 0), the index must be returned from
     * 'encrypt' calls; the value is needed server-side to determine which private
     * key should be used for decryption.
     */
    function parseKey(rsaKeyString) {
        const split = rsaKeyString.split('|');
        if (split.length < 2 || split.length > 3) {
            throw new Error('ravelin/encrypt: invalid rsaKey');
        }
        let index;
        let modulus;
        let exponent;
        if (split.length === 2) {
            index = 0;
            modulus = split[1];
            exponent = split[0];
        }
        else {
            index = +split[0];
            modulus = split[2];
            exponent = split[1];
        }
        const key = new RSAKey();
        // Params specified in reverse order to how we defined the key
        key.setPublic(modulus, exponent);
        return {
            key: key,
            index: index,
            sig: sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(rsaKeyString)),
        };
    }
    /**
     * Encrypts plaintext using AES-GCM.
     */
    function aesEncrypt(plaintext) {
        const aesKeyLength = 256;
        const wordCount = aesKeyLength / 32;
        const paranoiaCount = 4; // 128 bits of entropy
        const sessionKey = sjcl.random.randomWords(wordCount, paranoiaCount);
        const iv = sjcl.random.randomWords(wordCount, paranoiaCount);
        const aesBlockCipher = new sjcl.cipher.aes(sessionKey);
        const bits = sjcl.codec.utf8String.toBits(plaintext);
        const ciphertext = sjcl.mode.gcm.encrypt(aesBlockCipher, bits, iv, null, 128);
        return {
            ciphertextB64: sjcl.codec.base64.fromBits(ciphertext),
            aesKeyB64: sjcl.codec.base64.fromBits(sessionKey),
            ivB64: sjcl.codec.base64.fromBits(iv),
        };
    }
    /**
     * Encrypts the AES key and IV using the RSA public key.
     */
    function rsaEncrypt(pubKey, aesKeyB64, ivB64) {
        const encryptedHex = pubKey.encrypt(aesKeyB64 + '|' + ivB64);
        if (!encryptedHex) {
            return '';
        }
        const encryptedBits = sjcl.codec.hex.toBits(encryptedHex);
        return sjcl.codec.base64.fromBits(encryptedBits);
    }

    /**
     * @fileoverview Detects ChromeDriver-specific artifacts, such as the fixed
     * globals it injects and the randomly-named `$cdc_…` keys it adds to `window`
     * and `document`. ChromeDriver is the WebDriver server behind Selenium's Chrome
     * sessions, so these are strong, direct evidence of a ChromeDriver-driven
     * runtime.
     */
    /** Fixed-name globals ChromeDriver injects onto `window`/`document`. */
    const CHROMEDRIVER_GLOBALS = ['$chrome_asyncScriptInfo'];
    /**
     * ChromeDriver injects randomly-named properties (e.g.
     * `$cdc_asdjflasutopfhvcZLmcfl_Array`) onto `window` and `document` that share a
     * recognisable prefix.
     */
    const CHROMEDRIVER_KEY_PATTERN = /^\$?(?:cdc|wdc)_/;
    /**
     * Detects browser automation driven by ChromeDriver.
     */
    class ChromeDriverDetector {
        signal = 'chromedriver';
        precedence = 25;
        triggered = false;
        indicators = [];
        env;
        constructor(env) {
            this.env = env;
        }
        async detect() {
            this._detectGlobals();
            this._detectInjectedKeys();
            this.triggered = this.indicators.length > 0;
            return {
                signal: this.signal,
                precedence: this.precedence,
                triggered: this.triggered,
                indicators: this.indicators,
            };
        }
        /** Fixed-name ChromeDriver globals on `window` and `document`. */
        _detectGlobals() {
            for (const target of [this.env, this.env.document]) {
                if (target) {
                    for (const global of CHROMEDRIVER_GLOBALS) {
                        const id = `global-${global}`;
                        if (global in target && !this._has(id)) {
                            // A fixed ChromeDriver global is a direct automation artifact.
                            this.indicators.push({ id, confidence: 95 });
                        }
                    }
                }
            }
        }
        /** Randomly-named ChromeDriver keys left on `window` and `document`. */
        _detectInjectedKeys() {
            for (const target of [this.env, this.env.document]) {
                if (target) {
                    let keys;
                    try {
                        keys = Object.getOwnPropertyNames(target);
                    }
                    catch {
                        continue;
                    }
                    for (const key of keys) {
                        const id = `injected-key-${key}`;
                        if (CHROMEDRIVER_KEY_PATTERN.test(key) && !this._has(id)) {
                            // A `$cdc_`/`wdc_` key is a recognisable ChromeDriver signature.
                            this.indicators.push({ id, confidence: 95 });
                        }
                    }
                }
            }
        }
        /** Whether an indicator with the given id has already been recorded. */
        _has(id) {
            return this.indicators.some(indicator => indicator.id === id);
        }
    }

    /**
     * @fileoverview WebDriver protocol and driver-leak signals, such as
     * `navigator.webdriver` and legacy WebDriver attributes on the document.
     */
    /**
     * Detects browser automation via the WebDriver standard and related driver artifacts.
     */
    class WebDriverDetector {
        signal = 'webdriver';
        precedence = 10;
        triggered = false;
        indicators = [];
        env;
        constructor(env) {
            this.env = env;
        }
        async detect() {
            const nav = this.env.navigator || {};
            // The standard automation flag; no human browser sets it.
            if (nav.webdriver) {
                this.indicators.push({ id: 'navigator-webdriver', confidence: 95 });
            }
            const doc = this.env.document;
            if (doc?.documentElement?.hasAttribute?.('webdriver')) {
                this.indicators.push({ id: 'document-element-webdriver-attr', confidence: 95 });
            }
            this.triggered = this.indicators.length > 0;
            return {
                signal: this.signal,
                precedence: this.precedence,
                triggered: this.triggered,
                indicators: this.indicators,
            };
        }
    }

    function createAutomationDetectors(env) {
        return [new ChromeDriverDetector(env), new WebDriverDetector(env)];
    }

    /**
     * @fileoverview Heuristics for headless and headless-like browser environments,
     * such as zero window dimensions, HeadlessChrome user agents, empty plugins or
     * languages, the Notification permission inconsistency, and software WebGL
     * renderers. The latter two catch headless Chromium (e.g. default Playwright and
     * Puppeteer) even when nothing else leaks.
     */
    /** Renderer strings reported by GPU-less/software WebGL backends. */
    const SOFTWARE_RENDERER_PATTERN = /swiftshader|llvmpipe|mesa|software/i;
    /**
     * Detects environment fingerprints commonly seen in headless automation.
     */
    class HeadlessDetector {
        signal = 'headless';
        precedence = 10;
        triggered = false;
        indicators = [];
        env;
        constructor(env) {
            this.env = env;
        }
        async detect() {
            this._detectUserAgentAndPlugins();
            this._detectSoftwareWebGL();
            await this._detectNotificationMismatch();
            this.triggered = this.indicators.length > 0;
            return {
                signal: this.signal,
                precedence: this.precedence,
                triggered: this.triggered,
                indicators: this.indicators,
            };
        }
        /** Synchronous user-agent, dimension, plugin, and language heuristics. */
        _detectUserAgentAndPlugins() {
            const nav = this.env.navigator || {};
            if (this.env.outerWidth === 0 && this.env.outerHeight === 0) {
                // Common headless tell, but legitimately possible before the window sizes.
                this.indicators.push({ id: 'zero-outer-dimensions', confidence: 30 });
            }
            const appVersion = nav.appVersion || '';
            if (/headless/i.test(appVersion)) {
                this.indicators.push({ id: 'headless-app-version', confidence: 60 });
            }
            const userAgent = nav.userAgent || '';
            if (/HeadlessChrome/i.test(userAgent)) {
                this.indicators.push({ id: 'headless-chrome-user-agent', confidence: 60 });
            }
            if (nav.languages && nav.languages.length === 0) {
                this.indicators.push({ id: 'no-languages', confidence: 30 });
            }
            if (nav.plugins && nav.plugins.length === 0) {
                // Weak on its own: modern non-Chromium browsers legitimately report none.
                this.indicators.push({ id: 'no-plugins', confidence: 30 });
            }
        }
        /**
         * A software WebGL backend (SwiftShader/llvmpipe/Mesa) indicates a GPU-less
         * environment, typical of headless Chromium.
         */
        _detectSoftwareWebGL() {
            const doc = this.env.document;
            if (typeof doc?.createElement !== 'function') {
                return;
            }
            let gl;
            try {
                const canvas = doc.createElement('canvas');
                gl = (canvas.getContext('webgl') ||
                    canvas.getContext('experimental-webgl'));
            }
            catch {
                return;
            }
            if (!gl) {
                return;
            }
            try {
                const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                if (!debugInfo) {
                    return;
                }
                const renderer = String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '');
                if (SOFTWARE_RENDERER_PATTERN.test(renderer)) {
                    // GPU-less rendering is typical of headless, but also real VMs/servers.
                    this.indicators.push({ id: 'software-webgl-renderer', confidence: 60 });
                }
            }
            catch {
                // Reading GPU info can throw in locked-down contexts; ignore.
            }
        }
        /**
         * Headless Chrome reports `Notification.permission === 'denied'` while
         * `navigator.permissions.query` reports `'prompt'` for notifications. Real
         * browsers keep these consistent, so a mismatch is a strong headless tell.
         */
        async _detectNotificationMismatch() {
            if (this.env.Notification?.permission !== 'denied') {
                return;
            }
            const permissions = this.env.navigator?.permissions;
            if (typeof permissions?.query !== 'function') {
                return;
            }
            try {
                const status = await permissions.query({ name: 'notifications' });
                if (status?.state === 'prompt') {
                    // A well-established headless Chrome inconsistency.
                    this.indicators.push({ id: 'permission-mismatch', confidence: 70 });
                }
            }
            catch {
                // Permission probing is best-effort; ignore failures.
            }
        }
    }

    function createEnvironmentDetectors(env) {
        return [new HeadlessDetector(env)];
    }

    /**
     * Main entry point for bot detection. Runs the defined detectors and builds
     * the final detection result.
     */
    class BotDetector {
        detectors = [];
        _env;
        _detectionResult;
        constructor(options) {
            this._env = options?.env ?? globalThis;
            // TODO: In the future, we can add different categories of detectors. We could
            // also allow these to be configurable by passing in options to this constructor.
            this.register([
                ...createAutomationDetectors(this._env),
                ...createEnvironmentDetectors(this._env),
            ]);
        }
        register(detector) {
            if (Array.isArray(detector)) {
                this.detectors.push(...detector);
            }
            else {
                this.detectors.push(detector);
            }
        }
        /** Evaluate every registered detector in parallel. */
        async detect() {
            // If we've already run the detection, return the cached result.
            if (this._detectionResult) {
                return this._detectionResult;
            }
            const results = [];
            await Promise.all(this.detectors.map(async (detector) => {
                const result = await detector.detect();
                results.push(result);
            }));
            this._detectionResult = this._buildResult(results);
            return this._detectionResult;
        }
        _buildResult(results) {
            const triggered = results.filter(result => result.triggered);
            const primary = triggered.length > 0
                ? triggered.reduce((best, result) => (result.precedence > best.precedence ? result : best))
                : undefined;
            // Sum all of the confidence values for all indicators. No need to normalise
            // to 100 as any value greater than 90 is considered a bot.
            const score = triggered.reduce((sum, result) => {
                return sum + result.indicators.reduce((sum, indicator) => sum + indicator.confidence, 0);
            }, 0);
            let verdict;
            if (score > 90) {
                verdict = 'bot';
            }
            else if (score > 50) {
                verdict = 'suspectedBot';
            }
            else {
                verdict = 'human';
            }
            const indicators = triggered.length > 0
                ? triggered.reduce((acc, result) => {
                    acc[result.signal] = result.indicators.map(indicator => indicator.id);
                    return acc;
                }, {})
                : undefined;
            return {
                verdict,
                signal: primary?.signal,
                indicators,
            };
        }
    }

    /**
     * Track class hooks into the browser to capture user events.
     */
    class Track {
        core;
        /** An identifier which lasts until the next page refresh. */
        windowId = uuid();
        classifyPaste;
        dimensions;
        _listeners = [];
        _incognitoDetected;
        _botDetector;
        /**
         * @param core The Core library instance.
         * @param cfg The track configuration.
         */
        constructor(core, cfg) {
            this.core = core;
            // Paste events
            this.classifyPaste = cfg.classifyPaste;
            try {
                this.dimensions = windowDimensions();
            }
            catch {
                // Suppress error
            }
            // Start tracking events
            if (cfg.init !== false && cfg.track !== false) {
                this.init(cfg.page);
            }
        }
        /**
         * init hooks Track into the page.
         * @param page Additional properties describing the page,
         * passed to load(page). If false, disables automatic page tracking.
         */
        init(page) {
            if (page !== false) {
                this.load(typeof page === 'object' ? page : undefined);
            }
            this._attachAll();
        }
        /**
         * Disable tracking by removing all automatically attached event listeners,
         * (paste and resize). Manually triggered track events will still be sent.
         */
        disable() {
            this._detach();
        }
        /**
         * Attach event listeners at the root of the document
         * to return some key events back to Ravelin.
         */
        _attachAll() {
            this._listeners = [];
            this._attach({
                target: document,
                event: 'paste',
                // The paste listener is only ever invoked with a ClipboardEvent.
                handler: this.core.bind(this.paste, this),
            });
            this._attach({
                target: window,
                event: 'resize',
                handler: debounce(250, this.core.bind(this.resize, this)),
            });
        }
        /**
         * Mirrors target.addEventListener(event, handler) and
         * stores the listener so we can remove it later.
         */
        _attach(e) {
            this._listeners.push(e);
            e.target.addEventListener(e.event, e.handler);
        }
        /**
         * Removes event listeners that were added.
         */
        _detach() {
            while (this._listeners && this._listeners.length > 0) {
                const e = this._listeners.pop();
                if (e) {
                    e.target.removeEventListener(e.event, e.handler);
                }
            }
        }
        /**
         * Send an event to Ravelin.
         * @param type Identifies the origin of the event.
         * @param name A description of what occurred.
         * @param props Additional properties.
         */
        _send(type, name, props) {
            const promises = [this.core.ids(), this.incognitoDetected(), this.detectBot()];
            return Promise.all(promises).then(result => {
                const ids = result[0];
                const incognitoDetected = result[1];
                const botDetectionResult = result[2];
                return this.core
                    .send('POST', 'z', {
                    events: [
                        {
                            eventType: type,
                            eventData: {
                                eventName: name,
                                properties: props,
                            },
                            libVer: this.core.version,
                            eventMeta: {
                                trackingSource: 'browser',
                                url: window.location.href,
                                ravelinDeviceId: ids.device,
                                ravelinSessionId: ids.session,
                                ravelinWindowId: this.windowId,
                                pageTitle: document.title,
                                referrer: document.referrer || undefined,
                                clientEventTimeMilliseconds: Date.now(),
                                incognitoDetected: incognitoDetected,
                                bot: botDetectionResult,
                                timezoneOffset: new Date().getTimezoneOffset(),
                            },
                        },
                    ],
                })
                    .then(() => {
                    // Ensure Promise<void> return
                });
            });
        }
        /**
         * Returns a promise-wrapped boolean indicating if the browser
         * is in private/incognito mode.
         */
        incognitoDetected() {
            if (this._incognitoDetected) {
                return this._incognitoDetected;
            }
            this._incognitoDetected = detectincognitojs.detectIncognito()
                .then(res => res.isPrivate)
                .catch(() => false);
            return this._incognitoDetected;
        }
        /**
         * Returns a promise-wrapped object indicating if a track event
         * was triggered by a suspected bot.
         */
        detectBot() {
            if (!this._botDetector) {
                this._botDetector = new BotDetector();
            }
            return this._botDetector.detect();
        }
        /**
         * load event handler.
         * @param props Additional properties describing the page loaded.
         */
        load(props) {
            return this._send('track', 'PAGE_LOADED', props);
        }
        /**
         * event sends a user-driven event to Ravelin.
         * @param name The name of the event.
         * @param props Additional properties to describe the event.
         */
        event(name, props) {
            return this._send('track', name, props);
        }
        /**
         * Resize event handler.
         */
        resize() {
            let cur;
            try {
                cur = windowDimensions();
            }
            catch {
                return;
            }
            // Swap out old sizes
            const old = this.dimensions;
            this.dimensions = cur;
            if (!old || (old.w === cur.w && old.h === cur.h)) {
                return;
            }
            this._send('resize', 'resize', {
                resolutionOld: { w: old.w, h: old.h },
                resolutionNew: { w: cur.w, h: cur.h },
            });
        }
        /**
         * Paste event handler.
         */
        paste(e) {
            let sensitive = false;
            let panField = false;
            const props = {};
            const t = e && e.target;
            if (t) {
                // Customisable logic for identifying pan and sensitive fields
                const custom = this.classifyPaste && this.classifyPaste(e);
                panField = t.hasAttribute('data-rvn-pan') || !!(custom && custom.pan);
                // Locate the field
                props.fieldName = t.name || t.id || undefined;
                if (t.form) {
                    props.formName = attr(t.form, 'name') || attr(t.form, 'id');
                    props.formAction = attr(t.form, 'action');
                }
                // Look at the value, if safe
                sensitive =
                    t.type === 'password' ||
                        treeHasAttr(t, 'data-rvn-sensitive') ||
                        !!(custom && custom.sensitive);
                if (!sensitive) {
                    if (t.value) {
                        props.fieldValue = obfsPasteData(t.value);
                    }
                    if (typeof t.selectionStart === 'number') {
                        props.selectionStart = t.selectionStart;
                        props.selectionEnd = t.selectionEnd;
                    }
                }
            }
            // Describe the pasted content, if safe
            if (!sensitive && e && e.clipboardData) {
                // Don't consider window.clipboardData: it prompts the user
                const pastedData = e.clipboardData.getData('Text') || e.clipboardData.getData('text/plain');
                if (pastedData) {
                    if (panField) {
                        props.panCleaned = detectPAN(pastedData);
                    }
                    props.pastedValue = obfsPasteData(pastedData);
                }
            }
            if (panField && typeof props.panCleaned === 'undefined') {
                props.panCleaned = true;
            }
            return this._send('paste', 'paste', props);
        }
    }
    /**
     * Returns the size of the browser window, using the first set
     * of properties available to do so.
     *
     * There is a strange behaviour on Firefox (possibly related to extensions?)
     * where this function can throw a "TypeError: can't access dead object"
     * https://github.com/unravelin/ravelinjs/issues/105
     *
     */
    function windowDimensions() {
        return {
            w: window.outerWidth ||
                window.innerWidth ||
                document.documentElement.clientWidth ||
                document.body.clientWidth,
            h: window.outerHeight ||
                window.innerHeight ||
                document.documentElement.clientHeight ||
                document.body.clientHeight,
        };
    }
    /**
     * Returns whether it looks like str contains a card number.
     */
    function detectPAN(str) {
        // Disregard space or dash separators between characters
        str = str.replace(/[ -]+/g, '');
        // Find each sequence of digits
        const nums = /\d+/g;
        let match;
        while ((match = nums.exec(str)) !== null) {
            if (match[0].length >= 12 && match[0].length <= 19) {
                // If there was a sequence of digits between
                // 12 or 19 characters long, consider it a PAN
                return true;
            }
        }
        return false;
    }
    /**
     * obfsPasteData replaces all unicode Letters with X and 0-9 with 0 so that the
     * structure of a paste value is obvious, without revealing the contents.
     */
    function obfsPasteData(str) {
        // This regexp covers all latin and international alphabetic and numberic
        // characters. It is insufficient to replace /\w/g or /\d/g, but /\p{L}/ug
        // will match unicode Letters and /\p{N}/ug unicode Numbers. Generated at:
        // https://mothereff.in/regexpu#input=str.replace%28%2F%5Cp%7BN%7D%2Fgu%2C+%270%27%29.replace%28%2F%5Cp%7BL%7D%2Fgu%2C+%27X%27%29&dotAllFlag=1&unicodePropertyEscape=1
        return str
            .replace(/(?:[0-9\xB2\xB3\xB9\xBC-\xBE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D58-\u0D5E\u0D66-\u0D78\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19]|\uD800[\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDEE1-\uDEFB\uDF20-\uDF23\uDF41\uDF4A\uDFD1-\uDFD5]|\uD801[\uDCA0-\uDCA9]|\uD802[\uDC58-\uDC5F\uDC79-\uDC7F\uDCA7-\uDCAF\uDCFB-\uDCFF\uDD16-\uDD1B\uDDBC\uDDBD\uDDC0-\uDDCF\uDDD2-\uDDFF\uDE40-\uDE48\uDE7D\uDE7E\uDE9D-\uDE9F\uDEEB-\uDEEF\uDF58-\uDF5F\uDF78-\uDF7F\uDFA9-\uDFAF]|\uD803[\uDCFA-\uDCFF\uDD30-\uDD39\uDE60-\uDE7E\uDF1D-\uDF26\uDF51-\uDF54\uDFC5-\uDFCB]|\uD804[\uDC52-\uDC6F\uDCF0-\uDCF9\uDD36-\uDD3F\uDDD0-\uDDD9\uDDE1-\uDDF4\uDEF0-\uDEF9]|\uD805[\uDC50-\uDC59\uDCD0-\uDCD9\uDE50-\uDE59\uDEC0-\uDEC9\uDF30-\uDF3B]|\uD806[\uDCE0-\uDCF2\uDD50-\uDD59]|\uD807[\uDC50-\uDC6C\uDD50-\uDD59\uDDA0-\uDDA9\uDFC0-\uDFD4]|\uD809[\uDC00-\uDC6E]|\uD81A[\uDE60-\uDE69\uDF50-\uDF59\uDF5B-\uDF61]|\uD81B[\uDE80-\uDE96]|\uD834[\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDFCE-\uDFFF]|\uD838[\uDD40-\uDD49\uDEF0-\uDEF9]|\uD83A[\uDCC7-\uDCCF\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9])/g, '0')
            .replace(/(?:[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08C7\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\u9FFC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7BF\uA7C2-\uA7CA\uA7F5-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82C[\uDC00-\uDD1E\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDEC0-\uDEEB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDD\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])/g, 'X');
    }
    /**
     * Returns e.getAttribute(name) but also works even if element is a
     * <form><input name=name /></form>.
     */
    function attr(e, name) {
        return HTMLElement.prototype.getAttribute.call(e, name);
    }
    /**
     * Returns true if e or any of its parents have the named attribute.
     */
    function treeHasAttr(e, name) {
        while (e && e.hasAttribute) {
            if (e.hasAttribute(name)) {
                return true;
            }
            e = e.parentElement;
        }
        return false;
    }
    /**
     * Returns a function that calls fn after delayMs of the function not
     * being called. Arguments from the latest invocation are used.
     */
    function debounce(delayMs, fn) {
        let waitId;
        return (...args) => {
            if (waitId)
                clearTimeout(waitId);
            waitId = window.setTimeout(() => {
                fn(...args);
            }, delayMs);
        };
    }

    class Ravelin {
        core;
        track;
        encrypt;
        constructor(cfg = {}) {
            this.core = new Core(cfg);
            this.track = new Track(this.core, cfg);
            this.encrypt = new Encrypt(this.core, cfg);
        }
    }
    return Ravelin;

}));
