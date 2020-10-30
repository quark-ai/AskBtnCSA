// ==UserScript==
// @name         salesforceNutanixv3
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Sai
// @match       https://nutanix.my.salesforce.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant        GM_addStyle
// ==/UserScript==
// The waitForKeyElements should ideally be looking for the target (i.e. subject)
// In this case, it is looking for a div with a class 'main-col'
waitForKeyElements('div.mainSection', AddButton);
function AddButton()
{
    console.log(window.location.href)
        console.log("AddButton");
        var zNode       = document.createElement ('td')
        zNode.setAttribute("width", "20%");
        zNode.innerHTML = '<div href="javascript:void(0)" id="askQuarkButton" onclick="ButtonClickAction()"; style="background-color: #f2711c; color: #fff; font-size:4em;width:100%; height:100%;line-height:2; text-align:center; font-family:Helvetica, Arial, sans-serif; font-weight:bold; cursor: pointer; position:relative;"> Ask Quark <span style=" position:absolute; width:100%; height:100%; top:0; left: 0; z-index: 1;"></span> </a> </div>';
        var tabBarList = document.getElementsByClassName('efhpBody'); // need to use waitForElement
        tabBarList[0].childNodes[0].childNodes[1].appendChild(zNode)
        //--- Activate the newly added button.
        document.getElementById ("askQuarkButton").addEventListener (
            "click", ButtonClickAction, false
        );
}
function ButtonClickAction () {
    var subject = FindSubject();
    var desc = FindDescription();
    var type = FindType();
    var url;
    console.log('subject = ' + subject);
    console.log('desc = ' + desc);
    console.log('type = ' + type);
    if ( ["Licensing", "Non Technical Issue", "Question"].includes(type) ) {
        url = "https://csa.quark.ai/support?casesubject=" + subject + "&casedescription=" + desc;
    } else {
        url = "https://ntnxprod.quark.ai/support?casesubject=" + subject + "&casedescription=" + desc;
    }
    console.log(url);
    window.open(url, "_ask");
}
function FindSubject()
{
    var subjectText = null;
    // XPATH
    var targEval = document.evaluate (
        "//*[@id='cas14_ileinner']",
        document.documentElement,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    );
    if (targEval  &&  targEval.singleNodeValue) {
        var targNode  = targEval.singleNodeValue;
        // Payload code starts here.
        subjectText = targNode.textContent;
    }
    if(subjectText == null)
    {
        var tags = document.getElementsByTagName("span");
        var searchText = "Subject";
        var found;
        for (var i = 0; i < tags.length; i++) {
            if (tags[i].textContent == searchText) {
                found = tags[i];
                var siblingNode = found.parentNode.nextSibling;
                var node = siblingNode.firstChild;
                subjectText = node.textContent;
                break;
            }
        }
    }
    return subjectText;
}
function FindDescription()
{
    var descriptionText = null;
    // XPATH
    var targEval = document.evaluate (
        "//*[@id='cas15_ileinner']",
        document.documentElement,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    );
    if (targEval  &&  targEval.singleNodeValue) {
        var targNode  = targEval.singleNodeValue;
        // Payload code starts here.
        descriptionText = targNode.textContent;
    }
    if(descriptionText == null)
    {
        var tags = document.getElementsByTagName("span");
        var searchText = "Description";
        var found;
        for (var i = 0; i < tags.length; i++) {
            if (tags[i].textContent == searchText) {
                found = tags[i];
                var siblingNode = found.parentNode.nextSibling;
                var node = siblingNode.firstChild.firstChild;
                descriptionText = node.textContent;
                break;
            }
        }
    }
    return descriptionText;
}
function FindType()
{
    var typeText = null;
    // XPATH
    var targEval = document.evaluate (
        "//*[@id='cas5_ileinner']",
        document.documentElement,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    );
    if (targEval  &&  targEval.singleNodeValue) {
        var targNode  = targEval.singleNodeValue;
        // Payload code starts here.
        typeText = targNode.textContent;
    }
    if(typeText == null)
    {
        var tags = document.getElementsByTagName("span");
        var searchText = "Type";
        var found;
        for (var i = 0; i < tags.length; i++) {
            if (tags[i].textContent == searchText) {
                found = tags[i];
                var siblingNode = found.parentNode.nextSibling;
                var node = siblingNode.firstChild;
                typeText = node.textContent;
                break;
            }
        }
    }
    return typeText;
}