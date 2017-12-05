// ==UserScript==
// @name         RSUploader
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Vamgoon
// @match        http://rs.xidian.edu.cn/forum.php?mod=post&action=newthread&fid=*&specialextra=bt&cid=*
// @match        http://bt.byr.cn/*
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @grant        GM_openInTab
//@require      https://unpkg.com/axios/dist/axios.min.js
//@require      https://cdn.staticfile.org/jquery/1.11.2/jquery.min.js
// ==/UserScript==

(function() {
  switch (document.domain)  {
    case 'rs.xidian.edu.cn':
      var supportDomainArr = ['rs.xidian.edu.cn', 'bt.byr.cn'];//支持的domain
      var imgObjJsonArr = [];
      //监听跨域iframe使用postMessage发出的信息
      window.addEventListener('message', function(ee){
        var objJson = JSON.parse(ee.data);
        switch (objJson.type) {
          case 'text':
            document.querySelector('#e_iframe').contentWindow.document.querySelector('body').innerText = objJson.content;
            break;
          case 'title':
            document.querySelector('#subject').value = handleBYRTitle(objJson.content);
            analyzeSubjectValueRS();
            break;
          case 'torrent':
            break;
          case 'img':
            imgObjJsonArr.push(objJson);
            if (imgObjJsonArr.length === objJson.length) {
              console.log(imgObjJsonArr);
            break;
        }
      });

      //新建display：none的div包裹跨域获取的iframe
      var noneDisplayDiv = document.createElement('div');
      noneDisplayDiv.setAttribute('id', 'myNoneDisplayDiv');
      noneDisplayDiv.style.display = 'none';
      document.body.appendChild(noneDisplayDiv);

      //修复发种页面变宽bug
      var script01 = document.createElement('script');
      script01.text = `
        setTimeout(function () {
          var custominfo_pmenu = document.querySelector('#custominfo_pmenu');
          custominfo_pmenu.removeAttribute('style');
          custominfo_pmenu.style.right = '0';
          custominfo_pmenu.style.top = '287px';
          custominfo_pmenu.style.position = 'absolute';
          document.querySelector('.tip_horn').style.right = '21px';
        }, 100);
    `;
      document.body.appendChild(script01);

      //默认标题输入input框置空
      var subjectInput = document.querySelector('#subject');
      subjectInput.style.width = '60em';
      // subjectInput.value = '';

      //插入一键填写input
      document.querySelector('#postbox').insertAdjacentHTML("afterbegin",  `<div class="pbt cl"><input class="oneKeyInsertInput px" type="text" style="width: 60em;"><a id="oneKeyInsert" style="padding: 4px 5px;" href="javascript: void(0)" class="pn pnc">一键填写</a></div>`);
      document.querySelector('.oneKeyInsertInput').focus();

      //插入定义标题的修改框
      document.querySelector('#attachnotice_attach').insertAdjacentHTML('beforebegin', `
        <div class="pbt cl" id="myCustomizeFuns">
    <select class="v0000">
        <option value="1000">电影</option>
        <option value="1200">剧集</option>
        <option value="1400">音乐</option>
        <option value="1600">动漫</option>
        <option value="1800">游戏</option>
        <option value="2000">综艺</option>
        <option value="2200">体育</option>
        <option value="2400">软件</option>
        <option value="2600">学习</option>
        <option value="2800">其他</option>
        <option value="3000">纪录</option>
        <option value="3200">西电</option>
    </select>
    <select class="v2ss v1000">
        <option value="1002">中国</option>
        <option value="1003">欧美</option>
        <option value="1004">日韩</option>
        <option value="1005">其它</option>
    </select>
    <select style="display: none;" class="v2ss v1200">
        <option value="1201">大陆</option>
        <option value="1202">港台</option>
        <option value="1203">日剧</option>
        <option value="1204">韩剧</option>
        <option value="1205">欧美</option>
        <option value="1206">合集</option>
        <option value="1207">其他</option>
    </select>
    <select style="display: none;" class="v2ss v1400">
        <option value="1401">华语</option>
        <option value="1402">欧美</option>
        <option value="1403">日韩</option>
        <option value="1404">古典</option>
        <option value="1405">MV</option>
        <option value="1406">无损</option>
    </select>
    <select style="display: none;" class="v2ss v1600">
        <option value="1601">动画</option>
        <option value="1602">漫画</option>
        <option value="1603">音乐</option>
        <option value="1604">合集</option>
    </select>
    <select style="display: none;" class="v2ss v1800">
        <option value="1801">PC</option>
        <option value="1803">PSP</option>
        <option value="1802">其他</option>
        <option value="1804">补丁</option>
    </select>
    <select style="display: none;" class="v2ss v2000">
        <option value="2001">大陆</option>
        <option value="2002">港台</option>
        <option value="2003">日韩</option>
        <option value="2004">其他</option>
    </select>
    <select style="display: none;" class="v2ss v2200">
        <option value="2201">足球</option>
        <option value="2202">篮球</option>
        <option value="2203">其他</option>
    </select>
    <select style="display: none;" class="v2ss v2400">
        <option value="2401">镜像</option>
        <option value="2403">压缩包</option>
        <option value="2404">exe</option>
        <option value="2402">其他</option>
    </select>
    <select style="display: none;" class="v2ss v2600">
        <option value="2601">计算机</option>
        <option value="2602">外语</option>
        <option value="2603">考研</option>
        <option value="2604">课件</option>
    </select>
    <select style="display: none;" class="v2ss v2800">
        <option value="2801">视频</option>
        <option value="2802">音乐</option>
        <option value="2803">图片</option>
        <option value="2804">文档</option>
    </select>
    <select style="display: none;" class="v2ss v3000">
        <option value="3001">单集</option>
        <option value="3002">合集</option>
    </select>
    <select style="display: none;" class="v2ss v3200">
        <option value="3201">视频</option>
        <option value="3202">图片</option>
    </select>

</div>
      `);
      $('.v0000').on('change', function () {//监听一级类型改动
        $('.v2ss').hide();
        $('.v' + $('.v0000').val()).show();
        renderSubjectValue(1);
        renderSubjectValue(2);
      });
      $('.v2ss').on('change', function () {//监听二级类型改动
        renderSubjectValue(2);
      });

      //分析subject输入框框中的标题，修改下面的select按钮的值
      analyzeSubjectValueRS();

      //监听一键填写按钮
      document.querySelector('#oneKeyInsert').onclick = function () {
        var inputDoamin = null;
        var oneKeyInputUrl = document.querySelector('.oneKeyInsertInput').value;

        if (!VGcheckUrl(oneKeyInputUrl.trim())) {//若输入的不是正确的网址则终止
          showDialog('输入网址有误','notice', null, null, null, null, null, null, null, null, null);
          return;
        } else {
          inputDoamin = VGgetDomain(oneKeyInputUrl);
        }

        if (supportDomainArr.indexOf(inputDoamin) < 0) {//若输入的domain不支持则终止
          showDialog('尚未支持' + inputDoamin, 'notice', null, null, null, null, null, null, null, null, null);
          return;
        }

        switch (inputDoamin) {
          case 'rs.xidian.edu.cn':

            axios.get(oneKeyInputUrl).then(function (res) {
              var oDiv =  document.createElement('div');
              oDiv.innerHTML = res.data;

              //删除一些无用的隐藏信息
              var hideContents = oDiv.querySelectorAll('ignore_js_op');
              for (var k = 0, length = hideContents.length; k < length; k++) {
                if (hideContents[k].querySelector('.aimg_tip')) {
                  hideContents[k].removeChild(hideContents[k].querySelector('.aimg_tip'));
                }
              }

              //修复img标签src指向
              var objImgs = oDiv.querySelectorAll('td.t_f img');
              for (var i = 0,len = objImgs.length; i < len; i++) {
                var imgURL = objImgs[i].getAttribute('file');
                if (!(/http:\/\/rs.xidian.edu.cn.*/gi.test(imgURL))) {
                  imgURL = 'http://rs.xidian.edu.cn/' + imgURL;
                }
                objImgs[i].src = imgURL;
                objImgs[i].setAttribute('initialized', 'true');
                objImgs[i].setAttribute('lazyloaded', 'true');
                if (objImgs[i].getAttribute('onclick')) { objImgs[i].removeAttribute('onclick'); }
                if (objImgs[i].getAttribute('onmouseover')) { objImgs[i].removeAttribute('onmouseover'); }
                if (objImgs[i].getAttribute('zoomfile')) { objImgs[i].removeAttribute('zoomfile'); }
              }

              //删除“本贴最后由***编辑”
              var removeTag = oDiv.querySelector('td.t_f').firstElementChild;
              if (removeTag.nodeName.toUpperCase() === 'I') {
                oDiv.querySelector('td.t_f').removeChild(removeTag);
              }

              //填入标题以及正文内容
              if (oDiv.querySelector('td.t_f').querySelector('.blockcode')) {//处理代码块格式
                oDiv.querySelector('td.t_f').querySelector('.blockcode').innerHTML = '<blockquote>' + oDiv.querySelector('td.t_f').querySelector('.blockcode').innerText + '</blockquote>';
                oDiv.querySelector('td.t_f').querySelector('.blockcode').innerHTML = oDiv.querySelector('td.t_f').querySelector('.blockcode').innerHTML.replace(/\n\n/gi, '\n');
              }
              document.querySelector('#e_iframe').contentWindow.document.querySelector('body').innerHTML = oDiv.querySelector('td.t_f').innerHTML;
              document.querySelector('#subject').value = oDiv.querySelector('title').innerText.split(' -')[0] + '[From:一键转种脚本V1.1Beta版]';

              analyzeSubjectValueRS();

              //若有背景则加入背景
              var bgImg = oDiv.querySelector('.pcbs').firstElementChild;
              if (bgImg.nodeName.toUpperCase() === 'STYLE') {
                bgImg.innerHTML = bgImg.innerHTML.replace(/\#pid\d+/gi, 'body');
                document.querySelector('#e_iframe').contentWindow.document.querySelector('body').appendChild(bgImg);
              }
            });
            break;
          case 'bt.byr.cn':
            showDialog('正在获取"' + oneKeyInputUrl + '"中的内容', 'notice', null, null, null, null, null, null, null, 2, null);

            //iframe跨域获取html
            var ifr = document.createElement('iframe');
            ifr.src = oneKeyInputUrl;
            ifr.setAttribute('id', 'myIframe');
            document.querySelector('#myNoneDisplayDiv').appendChild(ifr);

            $('#myIframe')[0].onload = function () {
              showDialog('获取"' + oneKeyInputUrl + '"完毕，正在处理种子文件及图片。', 'notice', null, null, null, null, null, null, null, 2, null);
            };


            break;
        }

        //new window.File(msgArr, 'test.torrent', {type: msgArr[0].type});

        //return;
        /*
                var fd = new FormData();
                fd.append('uid', 276932);
                fd.append('hash', 'acff577714c0b41bf7d61dd5ec7a409a');
                fd.append('Filedata', new window.File(msgArr, 'test.torrent', {type: msgArr[0].type}));
                $.ajax({
            type: 'POST',
            url: 'http://rs.xidian.edu.cn/misc.php?mod=swfupload&operation=upload&simple=1&type=image',
            data: fd,
            processData: false, // 不会将 data 参数序列化字符串
            contentType: false, // 根据表单 input 提交的数据使用其默认的 contentType
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        console.log('进度', percentComplete);
                    }
                }, false);

                return xhr;
            }
        }).success(function (res) {
            // 拿到提交的结果
                    console.log(res);
        }).error(function (err) {
            console.error(err);
        });*/




      };
      break;
    case 'bt.byr.cn':
      var script02 = document.createElement('script');
      script02.text = `
        if (window.parent!==window) {
          //删除不需要的内容
          $('.autoseed', '#kdescr').remove();
          $('legend', '#kdescr').remove();



          //获取文字信息，并将img标签标记为'tagimgisnecessary',跨域发送至主页。
          var hanledTextMsg = $('#kdescr').html($('#kdescr').html().replace(/<img/gi, 'tagimgisnecessary<img')).text().trim();
          var objText = {
            type: 'text',
            content: hanledTextMsg
          };
          window.parent.postMessage(JSON.stringify(objText), 'http://rs.xidian.edu.cn');

          //获取标题信息
          var subInfo = '[' + $("#type").text() +']' + '['+ $("#sec_type").text() +']' + $('title').text().slice(15, -23);
          var objSubInfo = {
            type: 'title',
            content: subInfo
          };
          window.parent.postMessage(JSON.stringify(objSubInfo), 'http://rs.xidian.edu.cn');

          //获取图片信息
          var imgDomInfos = $('img', '#kdescr');
          var imgDomLen = imgDomInfos.length;
          var myIndex = 0;
          var sendImgObj = null;
          for (; myIndex < imgDomLen; myIndex++) {
            (function (x) {
              var xhr = new XMLHttpRequest();
              var imgUrlSrc = imgDomInfos[x].src;
              xhr.open('GET', imgUrlSrc, true);
              xhr.responseType = 'blob';
              xhr.onload = function(e) {
                if (this.status == 200) {
                  sendImgObj = {
                    type: 'img',
                    length: imgDomLen,
                    content: {
                      order: x,
                      name: imgUrlSrc.slice(imgUrlSrc.lastIndexOf('/') + 1),
                      blob: this.response
                    }
                  };
                  window.parent.postMessage(JSON.stringify(sendImgObj), 'http://rs.xidian.edu.cn');

                }
              };
              xhr.send();
            })(myIndex)
          }
        }
        `;
      document.body.appendChild(script02);
      break;
  }

  //通用function

  /**
   * 处理网址，获取其domain
   * @param url
   * @returns String
   */
  function VGgetDomain(url) {
    return url.match(/:\/\/([^\:|\/]+)/i)[1];
  }

  function VGcheckUrl(url) {
    return /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/gi.test(url);
  }

  /**
   * 当select按钮通过点击事件发生改变时，改变subject输入框中一级大类和二级类的名称。
   * @param n
   */
  function renderSubjectValue(n) {
    var subs = {"1000": "电影", "1200": "剧集", "1400": "音乐", "1600": "动漫", "1800": "游戏", "2000": "综艺", "2200": "体育", "2400": "软件", "2600": "学习", "2800": "其他", "3000": "纪录片", "3200": "西电", "1002": "中国", "1003": "欧美", "1004": "日韩", "1005": "其它", "1201": "大陆", "1202": "港台", "1203": "日剧", "1204": "韩剧", "1205": "欧美", "1206": "合集", "1207": "其他", "1401": "华语", "1402": "欧美", "1403": "日韩", "1404": "古典", "1405": "MV", "1406": "无损", "1601": "动画", "1602": "漫画", "1603": "音乐", "1604": "合集", "1801": "PC", "1803": "PSP", "1802": "其他", "1804": "补丁", "2001": "大陆", "2002": "港台", "2003": "日韩", "2004": "其他", "2201": "足球", "2202": "篮球", "2203": "其他", "2401": "镜像", "2403": "压缩包", "2404": "exe", "2402": "其他", "2601": "计算机", "2602": "外语", "2603": "考研", "2604": "课件", "2801": "视频", "2802": "音乐", "2803": "图片", "2804": "文档", "3001": "单集", "3002": "合集", "3201": "视频", "3202": "图片"};
    var subjectValue = $('#subject').val().slice(1, -1);
    var tempArr = subjectValue.split('][');

    switch (parseInt(n)) {
      case 1:
        tempArr[0] = subs[$('.v0000').val()];
        changeFormAction();
        break;
      case 2:
        tempArr[1] = subs[$('.v2ss:visible').val()];
        changeCidValue()
        break;
    }
    $('#subject').val('[' + tempArr.join('][') + ']');
  }

  /**
   * 在网页刚开始加载和一键转钟按钮点击时，通过解析subject输入框中的值，改变select按钮的value，并改变form的action
   */
  function analyzeSubjectValueRS() {
    var subs = {"1000": "电影", "1200": "剧集", "1400": "音乐", "1600": "动漫", "1800": "游戏", "2000": "综艺", "2200": "体育", "2400": "软件", "2600": "学习", "2800": "其他", "3000": "纪录片", "3200": "西电", "1002": "中国", "1003": "欧美", "1004": "日韩", "1005": "其它", "1201": "大陆", "1202": "港台", "1203": "日剧", "1204": "韩剧", "1205": "欧美", "1206": "合集", "1207": "其他", "1401": "华语", "1402": "欧美", "1403": "日韩", "1404": "古典", "1405": "MV", "1406": "无损", "1601": "动画", "1602": "漫画", "1603": "音乐", "1604": "合集", "1801": "PC", "1803": "PSP", "1802": "其他", "1804": "补丁", "2001": "大陆", "2002": "港台", "2003": "日韩", "2004": "其他", "2201": "足球", "2202": "篮球", "2203": "其他", "2401": "镜像", "2403": "压缩包", "2404": "exe", "2402": "其他", "2601": "计算机", "2602": "外语", "2603": "考研", "2604": "课件", "2801": "视频", "2802": "音乐", "2803": "图片", "2804": "文档", "3001": "单集", "3002": "合集", "3201": "视频", "3202": "图片"};
    var sub1arr = ["电影", "剧集", "音乐", "动漫", "游戏", "综艺", "体育", "软件", "学习", "其他", "纪录片", "西电"];
    var sub2arr = {"电影": [ "中国", "欧美", "日韩", "其它" ], "剧集": [ "大陆", "港台", "日剧", "韩剧", "欧美", "合集", "其他" ], "音乐": [ "华语", "欧美", "日韩", "古典", "MV", "无损" ], "动漫": [ "动画", "漫画", "音乐", "合集" ], "游戏": [ "PC", "PSP", "其他", "补丁" ], "综艺": [ "大陆", "港台", "日韩", "其他" ], "体育": [ "足球", "篮球", "其他" ], "软件": [ "镜像", "压缩包", "exe", "其他" ], "学习": [ "计算机", "外语", "考研", "课件" ], "其他": [ "视频", "音乐", "图片", "文档" ], "纪录片": [ "单集", "合集" ], "西电": [ "视频", "图片"]};
    var subs1 = {"电影": "1000", "剧集": "1200", "音乐": "1400", "动漫": "1600", "游戏": "1800", "综艺": "2000", "体育": "2200", "软件": "2400", "学习": "2600", "其他": "2800", "纪录片": "3000", "西电": "3200"};
    var subs2 = {"电影": { "中国": "1002", "欧美": "1003", "日韩": "1004", "其它": "1005"}, "剧集": { "大陆": "1201", "港台": "1202", "日剧": "1203", "韩剧": "1204", "欧美": "1205", "合集": "1206", "其他": "1207"}, "音乐": { "华语": "1401", "欧美": "1402", "日韩": "1403", "古典": "1404", "MV": "1405", "无损": "1406"}, "动漫": { "动画": "1601", "漫画": "1602", "音乐": "1603", "合集": "1604"}, "游戏": { "PC": "1801", "PSP": "1803", "其他": "1802", "补丁": "1804"}, "综艺": { "大陆": "2001", "港台": "2002", "日韩": "2003", "其他": "2004"}, "体育": { "足球": "2201", "篮球": "2202", "其他": "2203"}, "软件": { "镜像": "2401", "压缩包": "2403", "exe": "2404", "其他": "2402"}, "学习": { "计算机": "2601", "外语": "2602", "考研": "2603", "课件": "2604"}, "其他": { "视频": "2801", "音乐": "2802", "图片": "2803", "文档": "2804"}, "纪录片": { "单集": "3001", "合集": "3002"}, "西电": { "视频": "3201", "图片": "3202"}};
    var subjectValue = $('#subject').val().slice(1, -1);
    var tempArr = subjectValue.split('][');
    var temp1 = null;
    if (sub1arr.indexOf(tempArr[0]) > -1) {
      temp1 = subs1[tempArr[0]];
    } else {
      temp1 = subs1['其他'];
    }

    $('.v0000').val(temp1);
    $('.v2ss').hide();
    $('.v' + $('.v0000').val()).show();
    changeFormAction();

    if (sub2arr[subs[$('.v0000').val()]].indexOf(tempArr[1]) > -1) {
      $('.v2ss:visible').val(subs2[subs[$('.v0000').val()]][tempArr[1]]);
      changeCidValue()
    } else {
      $('.v2ss:visible').val(subs2[subs[$('.v0000').val()]]['其它']);
      changeCidValue()
    }

  }

  function handleBYRTitle(BYRTitle) {
    var subjectValue = BYRTitle.slice(1, -1);
    var tempA = subjectValue.split('][');

    var tempArr = [];
    for(var i = 0; i < tempA.length; i++){
      if (tempArr.indexOf(tempA[i]) === -1 && tempA[i] !== '') {
        tempArr.push(tempA[i]);
      }
    }

    if (tempArr[0] === '游戏' && tempArr[1] === '视频') {
      tempArr[0] = '其他';
      return '[' + tempArr.join('][') + ']';
    }

    //修改一级标题，以符合睿思规范
    if (tempArr[0] === '资料') {
      tempArr[0] = '其他';
      tempArr[1] = '文档';
      return '[' + tempArr.join('][') + ']';
    }

    if (tempArr[0] === '纪录') {
      tempArr[0] = '纪录片';
      if (tempArr[1] === '连载') {
        tempArr[1] = '单集';
      }
      return '[' + tempArr.join('][') + ']';
    }

    //修改二级标题，以符合睿思规范
    var subs2 = {'电影': {'华语': '中国', '欧洲': '欧美', '北美': '欧美', '亚洲': '其它', '其他': '其它'}, '剧集': {'日韩': '其他'}, '动漫': {'周边': '动画', '其他': '动画'}, '音乐': {'大陆': '华语', '港台': '华语', '其他': '无损'}, '综艺': {'欧美': '其他'}, '游戏': {'主机': '其他', '移动': '其他', '掌机': 'PSP'}, '软件': {'Windows': '其他', 'OSX': '其他', 'Linux': '其他', 'Android': '其他', 'iOS': '其他'}, '体育': {'F1': '其他', '网球': '其他'}};
    if (subs2[tempArr[0]].hasOwnProperty(tempArr[1])) {
      tempArr[1] = subs2[tempArr[0]][tempArr[1]];
    }
    return '[' + tempArr.join('][') + ']';
  }

  function changeFormAction() {
    var subs = {"1000": "13", "1200": "14", "1400": "15", "1600": "16", "1800": "17", "2000": "18", "2200": "19", "2400": "20", "2600": "537", "2800": "22", "3000": "214", "3200": "562"};

    $('#postform').attr('action','forum.php?mod=post&action=newthread&fid='+ subs[$('.v0000').val()] +'&extra=&topicsubmit=yes');
  }

  function changeCidValue() {
    $('input[name="cid"]').val($('.v2ss:visible').val());
  }

})();
