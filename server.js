import app from './src/main.js'

const PORT = process.env.PORT || 8081

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT} 🚀`)
})