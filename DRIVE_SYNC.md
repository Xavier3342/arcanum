# Google Drive sync

## Using the character creator

On the device that has your characters, open **Journal & backups**, choose **Connect Google Drive**, then **Continue with Google**. Use your personal Google account and select **My Drive → DND**. Wait for **Synced to Drive** before connecting the next device.

On the other device, follow the same steps with the same account and folder. Arcanum uses one document called **Arcanum Character Sync**. Leave its contents to Arcanum. Separate JSON exports are still available under **Export & restore**.

Edits save to the current browser while offline. Reconnect when Google access expires. If both devices have edited the same save, **Keep both versions** brings together all characters and makes a separate copy of each character with competing edits. Characters deleted on one device may reappear when you choose to keep all versions. The Drive document supports roughly one million characters of data, including portraits.

## Google Cloud configuration

1. Use a dedicated Cloud project and enable the **Google Drive API**, **Google Docs API**, and **Google Picker API**.
2. Configure the consent screen and add the Google account that owns the DND folder as a test user if the app is in testing. Use the per-file scope `https://www.googleapis.com/auth/drive.file`.
3. Create a **Web application** OAuth client with the authorized JavaScript origin `https://xavier3342.github.io`. Supply the public client ID in `drive-config.js`.
4. Create a browser API key restricted to the **Google Picker API** and to `https://xavier3342.github.io/*` and `https://docs.google.com/*`. Set that key and the Cloud project number in `drive-config.js`. Keep OAuth client secrets and access tokens out of GitHub.
5. Publish through GitHub Pages and test with the same Google account in two browser profiles. First use test characters in a private test folder. Confirm first upload, loading on the second profile, an offline edit, and conflicting edits before connecting your regular save.

[Google Picker setup](https://developers.google.com/workspace/drive/picker/guides/web-picker-sample) · [Drive file permissions](https://developers.google.com/workspace/drive/api/guides/api-specific-auth) · [Docs revision checks](https://developers.google.com/workspace/docs/api/reference/rest/v1/documents/batchUpdate)
