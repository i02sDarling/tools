
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
// @version      1.2.3
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
// ==/UserScript==



(function () {
  'use strict';
  console.log("02sdarling:Running");
  let dbstatus = false;
  let curSelect = 1;
  let appendedString = "";
  const OutSelection = ['Ori', 'Out', 'Both'];
  const button = document.createElement('button');
  const toggleBtn = document.createElement('button');
  mkContainer();
  let intervalId;
  intervalId = setInterval(addClickEventWhenTargetAppears, 4000);

  function toggle() {
    button.textContent = 'Copy';
  }
  function setButttonText(btn, text) {
    btn.textContent = text;
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
    setButttonText(button, 'Waiting');
    button.style.top = '70%';
    appendStyle(button);
    document.body.appendChild(button);
  }
  function mkToggle() {
    toggleBtn.id = '02sdarlingYa';
    setButttonText(toggleBtn, OutSelection[curSelect]);
    toggleBtn.style.top = '90%';
    appendStyle(toggleBtn);
    document.body.appendChild(toggleBtn);
  }
  toggleBtn.addEventListener('click', function () {
    curSelect = (curSelect + 1) % 3;
    setButttonText(toggleBtn, OutSelection[curSelect]);
  })
  function getSpan() {
    const ytbPlayer = document.getElementById('ytd-player');
    const TopCont = ytbPlayer.children[0];

    const container = TopCont.children[0].lastChild;


    if (container.id !== 'immersive-translate-caption-window') {
      console.log('Lost window container! make sure you have installed the  immersive translation and opened it. If you have already done these things, you can wait.')
      return false;

    }
    const TmpString = container.getInnerHTML();
    const domstring = TmpString.replace(/<template[^>]*>|<\/template>/g, '');
    const doc = new DOMParser().parseFromString(domstring, "text/xml");
    let span = doc.getElementsByTagName('span');
    if (span) return span;
    console.err("Open the subtitle translate first");
    return false;
  }
  function getLineText() {
    const span = getSpan();
    if (span) {
      if (curSelect === 2) {
        return span[0].textContent + " " + span[1].textContent;
      } else {
        return span[curSelect].textContent;
      }
    }
    return "falut to copy";
  }

  function writeText(text) {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Copy successful：', text);
      })
      .catch(err => {
        console.error('Copy failed：', err);
      });
  }
  function record() {
    console.log('dbclick')

    if (!dbstatus) {//no db case start record

      const span = getSpan();
      const ori = span[0];
      const out = span[1];
      appendedString = "";
      const callback = function (mutationsList, observer) {
        for (let mutation of mutationsList) {
          if (mutation.type === "textContent") {
            appendedString += mutation.textContent; // 将span的textContent追加到字符串末尾
            console.log("Appended: " + mutation.textContent + "to" + appendedString);
            console.log("The " + mutation.textContent + " attribute was modified.");
          }
        }
      };
      this.observer = new MutationObserver(callback);

      const config = { attributes: true, childList: true, subtree: true, textContent: true };
      this.observer.observe(out, config);


    } else {//end record
      console.log('end recording');
      console.log(appendedString);
      appendedString = "";
      this.observer.disconnect();
    }

    dbstatus = !dbstatus;

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
      //TODO:timer click
      button.addEventListener('click', function () {

        let res = getLineText();
        try {
          writeText(res);
        } catch (err) {
          err = "";
        }

      })
      // button.addEventListener('dblclick', function () {
      //   let res = "dbclick";
      //   const span = getSpan();
      //   console.log(span)
      //   try {
      //     writeText(res);
      //   } catch (err) {
      //     err = "";
      //   }
      // })
      button.addEventListener('dblclick', record);
    } catch (e) {
      console.log('Waiting');
    }

  }


})();
