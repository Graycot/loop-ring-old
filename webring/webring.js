/* Oring v4.0. Copyleft 🄯 ALL WRONGS RESERVED 🄯 Gray (g@graycot.dev) (https://graycot.dev/).

Oring is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License (GPLv3+) as published by
the Free Software Foundation. (http://www.gnu.org/licenses/)*/

// get webring data
fetch("./webring.json")
.then(response => {
   return response.json();
})
.then(data => webring(data));

// get sites list
fetch("./sites.json")
.then(response => {
   return response.json();
})
.then(data => sites(data));

function webring(data) {
  // get webring data webring.json
  var webringName = data.webringInfo[0].webringName;
  var webringURL = data.webringInfo[0].webringURL;
  var webringHome = data.webringInfo[0].webringHome;
  var webringMemberList = data.webringInfo[0].webringMemberList;
}

function sites(data) {

  // get URL of referrer member site

  var referrerSiteURL = document.referrer;
  console.log(referrerSiteURL);
  var test = referrerSiteURL.match(/^https:\/\/|\/$/g);
  console.log(test);
  //Use regex to strip trailing /example/ on SUB.DOMAIN.TLD before searching sites.json

  //find referrer site in member list
  for (i = 0; i < data.webringSites.length; i++) {
    if (referrerSiteURL.startsWith(data.webringSites[i].siteURL)) {
      var referrerIndex = i;
      var referrerSiteURL = data.webringSites[referrerIndex].siteURL;
      var referrerSiteName = data.webringSites[referrerIndex].siteName;
      break;
    }
  }

  //find previous site in member list
  let previousIndex = (referrerIndex-1 < 0) ? data.webringSites.length-1 : referrerIndex-1;
  let previousSiteURL = data.webringSites[previousIndex].siteURL;
  let previousSiteName = data.webringSites[previousIndex].siteName;

  //find next site in member list
  let nextIndex = (referrerIndex+1 >= data.webringSites.length) ? 0 : referrerIndex+1;
  let nextSiteURL = data.webringSites[nextIndex].siteURL;
  let nextSiteName = data.webringSites[nextIndex].siteName;

  // Detect whether visitor clicked the Previous, List, Home, Next, Random, or other link:
  const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
  });
  let value = params.action;

  // If the site that the user just came from is not part of the webring, set the Previous and Next values to Random.
  if (referrerIndex == null) {
    previousIndex = randomIndex;
    nextIndex = randomIndex;
  }

  // Previous, List, Home, Next, Random, or other actions
  if (value == 'prev') {
      window.location.href = previousSiteURL;
  } else if (value == 'next') {
      window.location.href = nextSiteURL;
  } else if (value == 'list') {
      window.location.href = webringMemberList;
  } else if (value == 'home') {
      window.location.href = webringHome;
  } else if (value == 'test') {
    console.log('test');
  } else {
      //In-case of value == null, find random site in member list
    let randomIndex = Math.floor(Math.random() * (data.webringSites.length));
    let randomSiteURL = data.webringSites[randomIndex].siteURL;
    let randomSiteName = data.webringSites[randomIndex].siteName;
    window.location.href = randomSiteURL;
  }
};
