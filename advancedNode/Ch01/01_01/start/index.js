function delay(seconds, callback) {
    setTimeout(callback, seconds * 1000)
}

console.log('Staarting delays')

delay(2, () => {
    console.log('2 seconds')
})