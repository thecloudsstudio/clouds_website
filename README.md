# My Website

A modern, responsive website built with HTML, CSS, and JavaScript. Hosted on GitHub and deployed automatically to Netlify.

## 🚀 Live Demo

[View Live Site](https://clouds-website.netlify.app) *(Update this URL after Netlify deployment)*

## 📋 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations**: CSS animations and JavaScript interactions
- **Contact Form**: Netlify Forms integration for easy contact handling
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Performance Optimized**: Optimized assets and caching headers

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Hosting**: GitHub Pages (source) + Netlify (deployment)
- **Deployment**: Automatic deployment via Netlify's GitHub integration

## 📁 Project Structure

```
website/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   ├── js/
│   │   └── script.js       # JavaScript functionality
│   └── images/             # Images and icons
├── netlify.toml            # Netlify configuration
├── _redirects              # Netlify redirects
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Git installed on your machine
- A GitHub account
- A Netlify account (free)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/thecloudsstudio/clouds_website.git
   cd clouds_website
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server like Live Server extension in VS Code

### Deployment to Netlify

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Netlify**
   - Log in to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Choose GitHub and select your repository
   - Netlify will automatically detect settings from `netlify.toml`

3. **Auto-deployment**
   - Every push to the main branch automatically deploys to Netlify
   - Build logs and deployment status available in Netlify dashboard

## 📝 Customization

### Updating Content
- Edit `index.html` for content changes
- Modify `assets/css/style.css` for styling
- Update `assets/js/script.js` for functionality

### Adding New Pages
- Create new HTML files in the root directory
- Update navigation in `index.html`
- Add any new routes to `_redirects` if needed

### Contact Form
The contact form uses Netlify Forms. To enable:
1. Add `netlify` attribute to your form element
2. Netlify automatically handles form submissions
3. View submissions in your Netlify dashboard

## 🔧 Configuration Files

- **`netlify.toml`**: Netlify build and deployment settings
- **`_redirects`**: URL redirects and rewrites
- **`.gitignore`**: Files to exclude from Git tracking

## 📊 Performance

This website is optimized for performance with:
- Minified CSS and JavaScript (when needed)
- Optimized images
- Proper caching headers via Netlify
- Responsive images and lazy loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Website**: [Clouds Website](https://clouds-website.netlify.app)
- **GitHub**: [@thecloudsstudio](https://github.com/thecloudsstudio)
- **Email**: your.email@example.com

---

Built with ❤️ and deployed with Netlify