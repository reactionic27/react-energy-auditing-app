let UPLOADCARE_STARTED = false;

let UPLOADCARE_LOCALE_TRANSLATIONS = {
  // messages for widget
  errors: {
    'fileMaximumSize': 'File is too large'
  },
  // messages for dialog's error page
  dialog: { tabs: { preview: { error: {
    'fileMaximumSize': {
      title: 'Upload failed',
      text: 'File size greater than 10 MB',
      back: 'Back'
    }
  } } } }
};

export function uploadcareStart() {
  if (!UPLOADCARE_STARTED) {
    UPLOADCARE_STARTED = true;
    uploadcare.start({
      publicKey: UPLOADCARE_PUBLIC_KEY,
      autostore: true,
      live: false,
      localeTranslations: UPLOADCARE_LOCALE_TRANSLATIONS
    });
  }
}

export function isUploadcareStarted() {
  return UPLOADCARE_STARTED
}

export function prepUrl(url: ?string, height: ?number, width: ?number) {
  url = url || ''
  if (window.location.href.indexOf('https://') === 0) {
    url = url.replace('http://www.ucarecdn', 'https://ucarecdn');
  }
  if (height || width) {
    return `${url}-/resize/${width ? width : ""}x${height ? height : ""}/`;
  }
  return url
}

export function maxFileSize(size) {
  return function(fileInfo) {
    if (fileInfo.size !== null && fileInfo.size > size) {
      throw new Error("fileMaximumSize");
    }
  };
}
