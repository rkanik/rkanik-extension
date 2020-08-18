const compImports = require.context('.', false, /\.vue$/)
const components = {}
compImports.keys().forEach(compName => {
   const formattedName = compName.replace(/(\.\/|\.vue)/g, "")
   components[formattedName] = compImports(compName).default || compImports(compName)
});
export default components;