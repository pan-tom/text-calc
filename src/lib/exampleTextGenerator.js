function* generateText() {
    const letters = 'John gives me +100 for a good job\n+100 from Jane\nAdam wants -200 from me\nEve is generous +300\nThis does not count: (-100)'.split('');
    let index = 0;
    while(index < letters.length) {
        yield letters[index++];
    }
}

export default generateText;
