## Getting the latest Uploadcare widget

You can see the releases here: https://github.com/uploadcare/uploadcare-widget/releases

Get the raw version (that includes jQuery) and paste it into uploadcare.js and uploadcare.min.js. It looks like we use both in the shell scripts for packaging.

https://ucarecdn.com/widget/2.6.0/uploadcare/uploadcare.full.js
https://ucarecdn.com/widget/2.6.0/uploadcare/uploadcare.full.min.js


jQuery isn't used much in our app. If we need access to jQuery, `uploadcare` is a global, so we can grab it like that in the script:
```
const $ = uploadcare.jQuery
```

Uploadcare depends on jQuery. If we decide to package jQuery another way, here are those versions:

https://ucarecdn.com/widget/2.6.0/uploadcare/uploadcare.js
https://ucarecdn.com/widget/2.6.0/uploadcare/uploadcare.min.js
