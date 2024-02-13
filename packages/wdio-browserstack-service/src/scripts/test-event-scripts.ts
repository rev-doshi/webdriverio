export function testStartEvent() {
    const callback = arguments[arguments.length - 1]
    const fn = () => {
        window.addEventListener('A11Y_TAP_STARTED', fn2)
        const e = new CustomEvent('A11Y_FORCE_START')
        window.dispatchEvent(e)
    }
    const fn2 = () => {
        window.removeEventListener('A11Y_TAP_STARTED', fn)
        callback()
    }
    fn()
}

export function testForceStop() {
    const e = new CustomEvent('A11Y_FORCE_STOP')
    window.dispatchEvent(e)
}

export const saveResults =
  "/* browserstack_accessibility_automation_script */\nconst callback = arguments[arguments.length - 1];\nconst payloadToSend = arguments[0];\n\nfunction waitForScannerReadiness(retryCount = 100, retryInterval = 100) {\n  return new Promise((resolve, reject) => {\n    let count = 0;\n    const intervalID = setInterval(() => {\n      if (count > retryCount) {\n        clearInterval(intervalID);\n        reject(new Error('Accessibility Automation Scanner is not ready on the page.'));\n      } else if (findAccessibilityAutomationElement()) {\n        clearInterval(intervalID);\n        resolve({ status: 'success' });\n      } else {\n        count += 1;\n      }\n    }, retryInterval);\n  });\n}\n\nfunction saveAccessibilityResults() {\n  const requestEvent = new CustomEvent('A11Y_SAVE_RESULTS', { detail: payloadToSend });\n  const responseEvent = 'A11Y_RESULTS_SAVED';\n\n  const responseEventListener = () => {\n    window.removeEventListener(responseEvent, responseEventListener);\n    console.info(\"Accessibility Automation Scanner saved the test case results.\");\n    callback({ success: true, msg: \"Accessibility Automation Scanner saved the test case results.\" });\n  };\n\n  window.addEventListener(responseEvent, responseEventListener);\n\n  console.info(\"Requesting Accessibility Automation Scanner to save the test case results.\");\n  window.dispatchEvent(requestEvent);\n}\n\nfunction findAccessibilityAutomationElement() {\n  return document.querySelector('#accessibility-automation-element');\n}\n\nconst isHttpOrHttps = /^(http|https):$/.test(window.location.protocol);\n\nif (findAccessibilityAutomationElement()) {\n  console.info(\"Scanner is already ready on the page.\");\n  saveAccessibilityResults();\n} else if (isHttpOrHttps) {\n  waitForScannerReadiness()\n    .then((result) => {\n      if (result.status === 'success') {\n        console.info(\"Scanner is now ready on the page after multiple retries.\");\n        saveAccessibilityResults();\n      }\n    })\n    .catch((error) => {\n      console.error(\"Scanner is not ready on the page after multiple retries.\", error);\n      callback({ success: false, msg: \"Scanner is not ready on the page after multiple retries.\" });\n    });\n} else {\n  console.warn(\"Unable to save accessibility results, Invalid URL.\");\n  callback({ success: false, msg: \"Unable to save accessibility results, Invalid URL.\" });\n}\n"

export const scanScript =
  "/* browserstack_accessibility_automation_script */\nconst callback = arguments[arguments.length - 1];\nconst payloadToSend = arguments[0];\n\nfunction waitForScannerReadiness(retryCount = 100, retryInterval = 100) {\n  return new Promise((resolve, reject) => {\n    let count = 0;\n    const intervalID = setInterval(() => {\n      if (count > retryCount) {\n        clearInterval(intervalID);\n        reject(new Error('Accessibility Automation Scanner is not ready on the page.'));\n      } else if (findAccessibilityAutomationElement()) {\n        clearInterval(intervalID);\n        resolve({ status: 'success' });\n      } else {\n        count += 1;\n      }\n    }, retryInterval);\n  });\n}\n\nfunction scanForAccessibility() {\n  const requestEvent = new CustomEvent('A11Y_SCAN', { detail: payloadToSend });\n  const responseEvent = 'A11Y_SCAN_FINISHED';\n\n  const responseEventListener = () => {\n    window.removeEventListener(responseEvent, responseEventListener);\n    console.info(\"Accessibility Automation Scanner completed the scan.\");\n    callback({ success: true, msg: \"Accessibility Automation Scanner completed the scan.\" });\n  };\n\n  window.addEventListener(responseEvent, responseEventListener);\n\n  console.info(\"Requesting Accessibility Automation Scanner to perform a scan.\");\n  window.dispatchEvent(requestEvent);\n}\n\nfunction findAccessibilityAutomationElement() {\n  return document.querySelector('#accessibility-automation-element');\n}\n\nconst isHttpOrHttps = /^(http|https):$/.test(window.location.protocol);\n\nif (findAccessibilityAutomationElement()) {\n  console.info(\"Scanner is already ready on the page.\");\n  scanForAccessibility();\n} else if (isHttpOrHttps) {\n  waitForScannerReadiness()\n    .then((result) => {\n      if (result.status === 'success') {\n        console.info(\"Scanner is now ready on the page after multiple retries.\");\n        scanForAccessibility();\n      }\n    })\n    .catch((error) => {\n      console.error(\"Scanner is not ready on the page after multiple retries.\", error);\n      callback({ success: false, msg: \"Scanner is not ready on the page after multiple retries.\" });\n    });\n} else {\n  console.warn(\"Unable to perform accessibility scan, Invalid URL.\");\n  callback({ success: false, msg: \"Unable to perform accessibility scan, Invalid URL.\" });\n}\n"

export const accessibilityResultsScript =
  "/* browserstack_accessibility_automation_script */\nconst callback = arguments[arguments.length - 1];\n\nfunction waitForScannerReadiness(retryCount = 100, retryInterval = 100) {\n  return new Promise((resolve, reject) => {\n    let count = 0;\n    const intervalID = setInterval(() => {\n      if (count > retryCount) {\n        clearInterval(intervalID);\n        reject(new Error('Accessibility Automation Scanner is not ready on the page.'));\n      } else if (findAccessibilityAutomationElement()) {\n        clearInterval(intervalID);\n        resolve({ status: 'success' });\n      } else {\n        count += 1;\n      }\n    }, retryInterval);\n  });\n}\n\nfunction getAccessibilityResults() {\n  const requestEvent = new CustomEvent('A11Y_GET_RESULTS');\n  const responseEvent = 'A11Y_RESULTS_RESPONSE';\n\n  const responseEventListener = () => {\n    window.removeEventListener(responseEvent, responseEventListener);\n    console.info(\"Accessibility Automation Scanner provided the results.\");\n    callback(event.detail);\n  };\n\n  window.addEventListener(responseEvent, responseEventListener);\n\n  console.info(\"Requesting Accessibility Automation Scanner for the results.\");\n  window.dispatchEvent(requestEvent);\n}\n\nfunction findAccessibilityAutomationElement() {\n  return document.querySelector('#accessibility-automation-element');\n}\n\nconst isHttpOrHttps = /^(http|https):$/.test(window.location.protocol);\n\nif (findAccessibilityAutomationElement()) {\n  console.info(\"Scanner is already ready on the page.\");\n  getAccessibilityResults();\n} else if (isHttpOrHttps) {\n  waitForScannerReadiness()\n    .then((result) => {\n      if (result.status === 'success') {\n        console.info(\"Scanner is now ready on the page after multiple retries.\");\n        getAccessibilityResults();\n      }\n    })\n    .catch((error) => {\n      console.error(\"Scanner is not ready on the page after multiple retries.\", error);\n      callback({ success: false, msg: \"Scanner is not ready on the page after multiple retries.\" });\n    });\n} else {\n  console.warn(\"Unable to fetch accessibility results, Invalid URL.\");\n  callback({ success: false, msg: \"Unable to fetch accessibility results, Invalid URL.\" });\n}\n"

export const accessibilityResultsSummaryScript =
  "/* browserstack_accessibility_automation_script */\nconst callback = arguments[arguments.length - 1];\n\nfunction waitForScannerReadiness(retryCount = 100, retryInterval = 100) {\n  return new Promise((resolve, reject) => {\n    let count = 0;\n    const intervalID = setInterval(() => {\n      if (count > retryCount) {\n        clearInterval(intervalID);\n        reject(new Error('Accessibility Automation Scanner is not ready on the page.'));\n      } else if (findAccessibilityAutomationElement()) {\n        clearInterval(intervalID);\n        resolve({ status: 'success' });\n      } else {\n        count += 1;\n      }\n    }, retryInterval);\n  });\n}\n\nfunction getAccessibilityResultsSummary() {\n  const requestEvent = new CustomEvent('A11Y_GET_RESULTS_SUMMARY');\n  const responseEvent = 'A11Y_RESULTS_SUMMARY';\n\n  const responseEventListener = () => {\n    window.removeEventListener(responseEvent, responseEventListener);\n    console.info(\"Accessibility Automation Scanner provided the summary of the results.\");\n    callback(event.detail);\n  };\n\n  window.addEventListener(responseEvent, responseEventListener);\n\n  console.info(\"Requesting Accessibility Automation Scanner for the summary of results.\");\n  window.dispatchEvent(requestEvent);\n}\n\nfunction findAccessibilityAutomationElement() {\n  return document.querySelector('#accessibility-automation-element');\n}\n\nconst isHttpOrHttps = /^(http|https):$/.test(window.location.protocol);\n\nif (findAccessibilityAutomationElement()) {\n  console.info(\"Scanner is already ready on the page.\");\n  getAccessibilityResultsSummary();\n} else if (isHttpOrHttps) {\n  waitForScannerReadiness()\n    .then((result) => {\n      if (result.status === 'success') {\n        console.info(\"Scanner is now ready on the page after multiple retries.\");\n        getAccessibilityResultsSummary();\n      }\n    })\n    .catch((error) => {\n      console.error(\"Scanner is not ready on the page after multiple retries.\", error);\n      callback({ success: false, msg: \"Scanner is not ready on the page after multiple retries.\" });\n    });\n} else {\n  console.warn(\"Unable to fetch accessibility results summary, Invalid URL.\");\n  callback({ success: false, msg: \"Unable to fetch accessibility results summary, Invalid URL.\" });\n}\n"

export function testStop(this: any) {
    const callback = arguments[arguments.length - 1]

    this.res = null
    if (arguments[0].saveResults) {
        window.addEventListener('A11Y_TAP_TRANSPORTER', (event: any) => {
            (window as any).tapTransporterData = event.detail
            this.res = (window as any).tapTransporterData
            callback(this.res)
        })
    }
    const e = new CustomEvent('A11Y_TEST_END', { detail: arguments[0] })
    window.dispatchEvent(e)
    if (arguments[0].saveResults !== true ) {
        callback()
    }
}

export function accessibilityResults() : Promise<Array<{ [key: string]: any; }>> {
    return new Promise(function (resolve, reject) {
        try {
            const event = new CustomEvent('A11Y_TAP_GET_RESULTS')
            const fn = function (event: any) {
                window.removeEventListener('A11Y_RESULTS_RESPONSE', fn)
                resolve(event.detail.data)
            }
            window.addEventListener('A11Y_RESULTS_RESPONSE', fn)
            window.dispatchEvent(event)
        } catch {
            reject()
        }
    })
}

export function accessibilityResultsSummary() : Promise<{ [key: string]: any; }> {
    return new Promise(function (resolve, reject) {
        try {
            const event = new CustomEvent('A11Y_TAP_GET_RESULTS_SUMMARY')
            const fn = function (event: any) {
                window.removeEventListener('A11Y_RESULTS_SUMMARY_RESPONSE', fn)
                resolve(event.detail.summary)
            }
            window.addEventListener('A11Y_RESULTS_SUMMARY_RESPONSE', fn)
            window.dispatchEvent(event)
        } catch {
            reject()
        }
    })
}
