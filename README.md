# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment (Manual)

We are full CI/CD with GitHub Actions, but if you want to deploy manually, you can use the following command.

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `main` branch.

### Capturing Product Screenshots (mobile)
As of November 4th, 2025 our product documentation only reflects mobile devices. Specifically, we use iPhone screenshots.

After taking the screenshots (on a physical device or an emulator), we may need to edit them and/or compress the images.

#### Recommended workflow for phone screenshots
For the clearest screenshots:
1. Take the screenshot on your physical iPhone device.
2. AirDrop the screenshot to your computer.
3. Edit in Shottr (see Editing steps below).
4. Compress with Squoosh (see Compressing Images below).

This workflow produces sharper images than screenshotting an emulator.

### Editing images
We may need to add simple edits to the images to draw the readers' attention to a specific area of interest.

To do this, we use a tool named [Shottr](https://shottr.cc/). It's a handy and lightweight screenshotting tool with many capabilities to highlight, blur, and edit screenshots. There are more advanced features like OCR, scrolling screenshots, and a screen ruler. Shottr's own documentation is limited, but this [external blog post](https://www.podfeet.com/blog/2023/05/shottr/) is a good reference.

#### Editing steps
1. Download and install Shottr.
2. Open the screenshot in Shottr.
3. Press the keyboard shortcut **"s"** to select the *spotlight tool*. This highlights a specific area in a box and greys out everything else.
    - See the section below for default spotlight settings (only need to set up once).
4. Save image.
5. Rename the image (follow existing naming convention).

#### Standards and default settings for product documentation images/GIFs
To ensure the screenshots are consistent:
- Ensure your mobile device is not on power saving mode to prevent yellow battery icons.
- Ensure "Battery percentage" is disabled.
- Default spotlight box color in Shottr: `#F05539`
- Set spotlight border thickness like the image below (set by selecting the box created by the spotlight).
    - ![Spotlight thickness setting](/static/img/spotlight-thickness.png)
- Default darkness for areas outside the spotlight box in Shottr: **3** (set by selecting the box created by the spotlight and pressing keys 1–9 to adjust. Only need to do this once and Shottr will save your selection.)
- Default mobile screenshot dimensions in our product documentation is 250px.
- All images and GIFs must include alt text.
- Follow the existing naming convention for the other images in product documentation.

### Compressing Images

All images used in product documentation must be stored in Google Drive. Find the equivalent directory of where you added the image in the product documentation and upload within the correct subfolder. **Each image should include both the original and a compressed version.**
- If you're unsure where the directory is please ask.

#### Image compression steps
1. Save the original image (including any edits in Shottr) in the appropriate folder in Google Drive.
    - Ensure you follow the standards and default settings instructions above.
3. Use [Squoosh](https://squoosh.app/) to compress and convert the original image to `.webp` format.
4. Save the compressed image in the relevant **Compressed** folder in Google Drive.

Using Squoosh typically reduces image size by ~75% without noticeable quality loss.

### Capturing GIFs

We use [Screen Studio](https://screen.studio/) to capture GIFs for product documentation.

**Steps:**
1. Download and use our [default Screen Studio preset](https://drive.google.com/drive/folders/1ctXpLvZmFrh24iHZpgE2gJvPvVrJDpAn).
    - This preset configures background options, gradients, colors, and padding amongst other things for a consistent look.
2. Keep GIFs as short as possible. We haven’t found a reliable compression method that maintains quality, so use Screen Studio’s playback speed settings to optimize duration.
3. Upload the `.screenstudio` project file (not the exported GIF) to the relevant Google Drive folder. [Here is an example](https://drive.google.com/drive/folders/1pTori1Yofx5kmejWLpGqOgkCfpOLatRz).
    - The `.screenstudio` file will appear as a folder in Drive and will revert to a usable file when downloaded locally.

### Resources

- [Docusaurus Documentation](https://docusaurus.io/)
- [Markdown Basic Syntax](https://www.markdownguide.org/basic-syntax/)