/* 
    Inspired by: https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/core/style/ToStringCreator.html
*/
class ToStringCreator {
    constructor(object) {
        this.object = object;
        this.props = [];
    }

    append(name, value) {
        this.props.push(`${name}=${this.valueToString(value)}`);
        return this;
    }

    toString() {
        return `${this.object.constructor.name} { ${this.props.join(', ')} }`;
    }

    valueToString(value) {
        if (value instanceof Date) {
            return value.toISOString();
        }
        if (typeof value === 'object' && value !== null) {
            if (Array.isArray(value)) {
                return `[${value
                    .map((item) => this.valueToString(item))
                    .join(', ')}]`;
            } else {
                return new ToStringCreator(value).toString();
            }
        } else {
            return String(value);
        }
    }
}

module.exports = ToStringCreator;
