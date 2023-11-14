/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	sassOptions: {
		includePaths: [path.join(__dirname, "assets/styles")],
	},
	modularizeImports: {
		'@mui/icons-material': {
		  transform: '@mui/icons-material/{{member}}',
		},
	  },
};

module.exports = nextConfig;
