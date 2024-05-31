// ==UserScript==
// @name         Youtube Copying Selected Subtitles - Immersive Translation : 沉浸式翻译字幕复制
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @description  When Youtube using Immersive Translation copies the subtitles to the clipboard, supporting before translation, after translation, or select all Youtube使用沉浸式翻译时将字幕复制到剪贴板，支持翻译前,翻译后,或者全选
// @author       i02sDarling
// @match        https://www.youtube.com/watch?v=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @name en
// @license MIT
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
  function getText() {
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

        let res = getText();
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
