export default function toJson(obj) {
    return JSON.parse(JSON.stringify(obj));
}