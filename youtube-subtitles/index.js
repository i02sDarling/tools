// ==UserScript==
// @name         Youtube Copying Selected Subtitles - Immersive Translation
// @name:zh   沉浸式翻译字幕复制
// @name:zh-CN   沉浸式翻译字幕复制
// @name:en   Youtube Copying Selected Subtitles - Immersive Translation
// @namespace    https://github.com/i02sDarling/tools
// @description  When Youtube using Immersive Translation copies the subtitles to the clipboard, supporting before translation, after translation, or select all Youtube
// @description:zh-CN   使用沉浸式翻译时将字幕复制到剪贴板，支持翻译前,翻译后,或者全选
// @description:en   When Youtube using Immersive Translation copies the subtitles to the clipboard, supporting before translation, after translation, or select all Youtube
// @license       MIT
// @author       i02sDarling
// @version      1.3.5
// @include      *//www.youtube.com/watch?v=*
// @match        *://*.youtube.com/*
// @exclude      *://accounts.youtube.com/*
// @exclude      *://www.youtube.com/live_chat_replay*
// @exclude      *://www.youtube.com/persist_identity*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @license MIT
// @compatible     edge
// @compatible     firefox
// @compatible     chrome
// @downloadURL https://update.greasyfork.org/scripts/496556/Youtube%20Copying%20Selected%20Subtitles%20-%20Immersive%20Translation.user.js
// @updateURL https://update.greasyfork.org/scripts/496556/Youtube%20Copying%20Selected%20Subtitles%20-%20Immersive%20Translation.meta.js
// ==/UserScript==



(function () {
  'use strict';
  console.log("02sdarling:Running");
  let curSelect = 1;
  const OutSelection = ['Ori', 'Out', 'Both'];
  const button = document.createElement('button');
  const toggleBtn = document.createElement('button');
  mkContainer();
  let intervalId;
  intervalId = setInterval(addClickEventWhenTargetAppears, 4000);

  function toggle() {
    button.textContent = 'Copy';
  }
  function appendStyle(btn) {
    btn.style.position = 'absolute';
    btn.style.left = '10px';
    btn.style.transform = 'translateY(-70%)';
    btn.style.backgroundColor = '#007bff';
    btn.style.color = '#fff';
    btn.style.padding = '10px 15px';
    btn.style.border = 'none';
    btn.style.borderRadius = '5px';
    btn.style.cursor = 'pointer';

  }

  function mkContainer() {
    button.id = '02sdarling';
    button.textContent = 'Waiting';
    button.style.top = '70%';
    appendStyle(button);
    document.body.appendChild(button);
  }
  function mkToggle() {
    toggleBtn.id = '02sdarlingYa';
    toggleBtn.textContent = OutSelection[curSelect];
    toggleBtn.style.top = '90%';
    appendStyle(toggleBtn);
    document.body.appendChild(toggleBtn);
  }
  toggleBtn.addEventListener('click', function () {
    curSelect = (curSelect + 1) % 3;
    toggleBtn.textContent = OutSelection[curSelect];
  })
  function getSpan() {
    const container=document.getElementById('immersive-translate-caption-window');
    const TmpString = container.getInnerHTML();
    const domstring = TmpString.replace(/<template[^>]*>|<\/template>/g, '');
     return domstring;
  }
  function getText() {
    const span = getSpan();
    if (span) {
      const spanContents = span.match(/<span\b[^>]*>(.*?)<\/span>/gi);
      const res=spanContents.map(span => {
          const match = span.match(/>(.*?)<\/span>/); // 正则匹配 span 标签内的内容
          return match ? match[1] : null; // 返回捕获到的文本内容
      });
        return res;
    }
    return "falut to copy";
  }


  function addClickEventWhenTargetAppears() {
    try {
      if (getSpan()) {
        mkToggle();
        toggle();
        clearInterval(intervalId);
      }
      if (button.textContent === 'Waiting') {
        return;
      }
      //const ClickContainer=doc.getElementsByClassName('captions-text');
      button.addEventListener('click', function () {

        let resArray = getText();
        let res='';
        if(curSelect==1) res=resArray[1];
        else if(curSelect==2) res=resArray[0]+resArray[1];
        else res=resArray[0];
        navigator.clipboard.writeText(res)
          .then(() => {
            console.log('Copy successful：', res);
          })
          .catch(err => {
            console.error('Copy failed：', err);
          });
      })
    } catch (e) {
      console.log('Waiting');
    }

  }


})();
