import Home from "./routes/Home"
import Reader from './routes/Reader'


export const routes = [
    { path: '/', element: <Home />},
    { path: "read/:id", element: <Reader />}
]

export default routes;