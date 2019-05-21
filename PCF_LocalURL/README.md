# PCF Custom Control - Open Local File
A Custom Control built for Dynamics 365 CE using the PowerApps Component Framework. This Custom Control enables the ability to open a Local File link in Internet Explorer.

![Example Open File](https://github.com/jhetheringt7/PCF-CustomControl/blob/master/PCF_LocalURL/openFileExample.png)

## To Install
Download the Solution.zip provided within the /Solution/bin/debug folder above and install into a Dynamics 365 CE instance

## Update IE Internet Options
Due to the default security settings on most Browsers, the ability to open Local files is disabled by default. The following updates need to be applied:
1. Open Internet Explorer
2. Click "Options" and then "Internet Options"
3. Click the "Security" tab and then "Trusted Sites"
4. Click "Sites" and add both the Dynamics CE URL and the Local Machine in the format "file://MACHINE NAME"
