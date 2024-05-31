const template = `
<template shadowrootmode="open">
<div class="imt-caption-container">
  <div class="imt-caption-window">
    <div class="captions-text" style="flex-direction: column;">
      <span class="source-cue imt-cue" style="font-size: 19.3778px; color: rgb(255, 255, 255); background-color: rgba(8, 8, 8, 0.75); font-weight: 400;">
      the parent or in in the content like two direction because they are render in the</span>
      <span class="target-cue imt-cue" style="font-size: 19.3778px; color: rgb(255, 255, 255); background-color: rgba(8, 8, 8, 0.75); font-weight: 400;">父级中或内容中的所有内容（如两个方向），因为它们在
      </span>
    </div>
  </div>
</div>
<style>\n  .imt-caption-container {\n    pointer-events: none;\n    position: absolute;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    top: 0;\n    z-index: 2147483647;\n  }\n\n  .imt-caption-window {\n    pointer-events: auto;\n    position: absolute;\n    width: 90%;\n    left: 5%;\n    margin-bottom: 30px;\n    bottom: 0;\n    cursor: move;\n    display: flex;\n 
     flex-direction: column;\n   
      align-items: center;\n   
       justify-content: flex-end;\n 
       }\n\n  .captions-text {\n    
        display: flex;\n    bottom: 20px;\n
            color: white;\n    
      border-radius: 6px;\n
    text-align: center;\n
        white-space: pre-wrap;\n
        line-height: 1.5;\n
        align-items: center;\n
        }\n\n  .imt-cue {\n
        padding: 0 12px;\n  }\n\n
        .imt-caption-container {z-index:40;}\n
        .imt-caption-window {margin-bottom: 0; bottom: 2%;}
</style>
</template>`
const root = document.getElementById('root');

