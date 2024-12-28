import DefaultMain from "./DefaultMain"
import { NavigationProvider } from "./NavigationContext"

function App() {

  
  return (
      <NavigationProvider>
        <DefaultMain />
      </NavigationProvider>
  );
}

export default App
