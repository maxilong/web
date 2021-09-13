
const req = require.context('./svg', false, /\.svg$/)
const menu = require.context('./menu', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
requireAll(menu)
