function myNew(fn = () => {}, ...argc) {
    let obj = Object.create(fn.prototype)
    let result = fn.apply(obj, argc)
}