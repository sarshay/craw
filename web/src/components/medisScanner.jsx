export function scanHTMLForVideoAudio(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    const videoTags = Array.from(doc.querySelectorAll('video')).map(video => {
        const attributes = {};
        for (const { name, value } of video.attributes) {
            attributes[name] = value;
        }
        const sources = Array.from(video.querySelectorAll('source')).map(source => {
            const sourceAttributes = {};
            for (const { name, value } of source.attributes) {
                sourceAttributes[name] = value;
            }
            return sourceAttributes;
        });
        return { tag: 'video', attributes, sources };
    });

    const audioTags = Array.from(doc.querySelectorAll('audio')).map(audio => {
        const attributes = {};
        for (const { name, value } of audio.attributes) {
            attributes[name] = value;
        }
        const sources = Array.from(audio.querySelectorAll('source')).map(source => {
            const sourceAttributes = {};
            for (const { name, value } of source.attributes) {
                sourceAttributes[name] = value;
            }
            return sourceAttributes;
        });
        return { tag: 'audio', attributes, sources };
    });

    return [...videoTags, ...audioTags];
}