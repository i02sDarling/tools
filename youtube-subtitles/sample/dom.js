const template = `<template shadowrootmode="open"><div class="imt-caption-container"><div class="imt-caption-window"><div class="captions-text" style="flex-direction: column;"><span class="source-cue imt-cue" style="font-size: 10px; color: rgb(255, 255, 255); background-color: rgba(8, 8, 8, 0.75); font-weight: 400;">intense can I beat minecraft before my friend beats me we're about to find out</span><span class="target-cue imt-cue" style="font-size: 10px; color: rgb(255, 255, 255); background-color: rgba(8, 8, 8, 0.75); font-weight: 400;">疯狂了 在我的朋友击败我之前，我就击败了《我的世界》，我们即将发现</span></div></div></div><style>\n  .imt-caption-container {\n    pointer-events: none;\n    position: absolute;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    top: 0;\n    z-index: 2147483647;\n  }\n\n  .imt-caption-window {\n    pointer-events: auto;\n    position: absolute;\n    width: 90%;\n    left: 5%;\n    margin-bottom: 30px;\n    bottom: 0;\n    cursor: move;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: flex-end;\n  }\n\n  .captions-text {\n    display: flex;\n    bottom: 20px;\n    color: white;\n    border-radius: 6px;\n    text-align: center;\n    white-space: pre-wrap;\n    line-height: 1.5;\n    align-items: center;\n  }\n\n  .imt-cue {\n    padding: 0 12px;\n  }\n\n.imt-caption-container {z-index:40;}\n.imt-caption-window {margin-bottom: 0; bottom: 2%;}</style></template>`
const root = document.getElementById('root');

// const fragment = new DocumentFragment();
root.innerHTML = `
<div id="ytd-player">
        <div>
            <div>
                
            </div>
        </div>
    </div>

`;

