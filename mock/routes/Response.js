class Response {
    constructor(data, error_code = 0, success = true) {
        this.data = data;
        this.error_code = error_code;
        this.success = success;
    }
    toJSONString() {
        return JSON.stringify(this);
    }
}

module.exports = Response;
