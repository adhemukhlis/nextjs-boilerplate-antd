/** @type {import('next').NextConfig} */
const nextConfig = {
	publicRuntimeConfig: {
		AppName: 'NextJS Boilerplate AntDesign'
	},
	eslint: {
		dirs: ['.']
	},
	poweredByHeader: false,
	trailingSlash: false,
	transpilePackages: [
		'antd',
		// 'rc-util',
		// '@babel/runtime',
		// '@ant-design/icons',
		// '@ant-design/icons-svg',
		// 'rc-pagination',
		// 'rc-picker',
		// 'rc-tree',
		// 'rc-table'
	],
	reactStrictMode: false,
	images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com'
      },
    ],
  }
}

module.exports = nextConfig
