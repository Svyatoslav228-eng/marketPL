const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const readAnnounce = () =>
  JSON.parse(fs.readFileSync(path.join(__dirname, "announcement.json")));

const readAnn = () =>
  JSON.parse(fs.readFileSync(path.join(__dirname, "announcements.json")));

  const readAnnounce2 = () =>
  JSON.parse(fs.readFileSync(path.join(__dirname, "announcement2.json")));

const readAnn2 = () =>
  JSON.parse(fs.readFileSync(path.join(__dirname, "announcements2.json")));

const announcement = readAnnounce();
const ann = readAnn();
// const announce = {...announcement,...ann}

const announcement2 = readAnnounce2();
const ann2 = readAnn2();
// const announce2 = {...announcement2,...ann2}

function findBySubname(subname) {
  
  const keys = Object.keys(ann);
  const keey = Object.keys(ann2);
  console.log(keys);

  for (const key of keys) {
    if (key.toLowerCase().includes(subname.toLowerCase())) {
      return key;
    }
  }

  for (const key of keey) {
    if (key.toLowerCase().includes(subname.toLowerCase())) {
      return key;
    }
  }
  return null;
}

function getBySubname(subname) {
  if (!subname) return {};

  const keys = Object.keys(announcement);
  const keey = Object.keys(ann);
  
  
  for (const key of keys) {
    if (key.toLowerCase().includes(subname.toLowerCase())) {
      return announcement[key];
    }
  }
  for (const key of keey) {
    if (key.toLowerCase().includes(subname.toLowerCase())) {
      return ann[keey];
    }
  }
  return {};
}

function getBySubname2(subname) {
  if (!subname) return {};

  const keys = Object.keys(announcement2);
  const keey = Object.keys(ann2);
  
  
  for (const key of keys) {
    if (key.toLowerCase().includes(subname.toLowerCase())) {
      return announcement2[key];
    }
  }
  for (const key of keey) {
    if (key.toLowerCase().includes(subname.toLowerCase())) {
      return ann2[keey];
    }
  }
  return {};
}



function editAnnouncement(data) {
  const { subname, price, someSpec, IMGsrc } = data;
  const name = findBySubname(subname)

  
  if (name && name in ann) {
    if (price !== undefined) {
      ann[name].price = data.price;
    }
    if (someSpec !== undefined) {
      ann[name].someSpec = data.someSpec;
    }
    if (IMGsrc !== undefined) {
      ann[name].IMGsrc = data.IMGsrc;
    }
    
    return getBySubname(ann);
  }

  
  if (name && name in ann2) {
    if (price !== undefined) {
      ann2[name].price = data.price;
    }
    if (IMGsrc !== undefined) {
      ann2[name].IMGsrc = data.IMGsrc;
    }

    return getBySubname(ann2);
  }
  return null;
}

function deleteAnnouncement(subname) {
  const annName = findBySubname(subname);
  if (!annName) return null;

  delete ann[annName];
  delete ann2[annName];
  return annName;
}

module.exports = {
  announcement,
  ann,
  announcement2,
  ann2,
  getBySubname,
  getBySubname2,
  editAnnouncement,
  deleteAnnouncement,
  
};
