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

### Capturing Product Screenshots

We use a tool named [Shottr](https://shottr.cc/). It's a handy and lightweight screenshotting tool with many capabilities to highlight, blur, and edit screenshots. There are more advanced features like OCR, scrolling screenshots, and a screen ruler. Shottr's own documentation is limited, but this [external blog post](https://www.podfeet.com/blog/2023/05/shottr/) is a good reference.

#### Steps
1. Download and install Shottr.
2. Take a screenshot.
3. Press the keyboard shortcut **"s"** to select the *spotlight tool*. This highlights a specific area in a box and greys out everything else.

#### Eneris documentation standards:
- Default spotlight box color: `#F05539`
- Default darkness for areas outside the spotlight box: **3** (set by selecting the box created by the spotlight and pressing keys 1–9 to adjust)

### Processing and Compressing Images

All images used in product documentation must be stored in our [Google Drive](https://drive.google.com/drive/folders/1rRqEVpJUR3RIKZTu7BPR7ZM_0kk-7ma0). Find the location where you added the image and upload within the correct subfolder. Each image should include both the original and a compressed version.

#### Steps
1. Save the original image in the appropriate folder in Google Drive.
2. Review the existing file naming conventions and follow them for consistency.
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