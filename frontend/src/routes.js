import Home from "./routes/Home"
import Reader from './routes/Reader'
import Login from './routes/Login'
import Register from "./routes/Register"

export const routes = [
    { path: '/', element: <Home />},
    { path: 'read/:id', element: <Reader />},
    { path: '/login', element: <Login />},
    { path: '/register', element: <Register />}
]

export default routes;