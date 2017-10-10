import React from 'react'

export const desktopBrowserWarning = {
  title: 'Alert: Incompatible browser',
  message(name, version) {
    return `
      <p>Chrome browser is required. On iPhone or iPad, mobile Safari can alternatively be used.
        It looks like you are using ${name}, version ${version}.
      </p>
      <p>
        If you do not have Chrome, you can <a href="https://www.google.com/chrome/"> download it for free</a>.
        If you need assistance, <a href="http://snuggpro.com/support">contact support</a>.
      </p>
    `
  }
}

export const oldStackWarning = {
  title: 'Warning: Deprecated and Unsupported Browser',
  message(name, detectedVersion, recommendedVersion) {
    return `
      <p>You're running version ${detectedVersion} of ${name}.
      We strongly recommend that you upgrade to a newer version (${recommendedVersion} or later).
      If this is the most recent version available for your operating system (Window XP & Vista, OS X 10.6.8 and earlier),
      you should upgrade to a more recent and secure OS.
      </p>
      <p>
        If you need assistance, <a href="http://snuggpro.com/support">contact support</a>.
      </p>
    `
  }
}

export const ServicesDown = () => (
  <div style={{fontSize: '120%', padding: '0 10px'}} className='text-left'>
    <strong>Alert: </strong> Large, important services are down right now. Becauase of this, Chat support and photos are not currently working. The rest of our app should be working properly.
    This is much bigger than us. Other services unrelated to you may also be out as well. This is out of our hands and the only thing to do is wait until those services are restored. If you have a support question unrelated to photos and support chat, you can email us as pro@snugghome.com
  </div>
)
