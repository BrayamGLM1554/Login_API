// seed.js - Script para crear usuarios iniciales en MongoDB
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb+srv://ADMIN:ADMIN12345678@cluster0.rvrn2ng.mongodb.net/impertula?retryWrites=true&w=majority&appName=Cluster0';

// User Schema (igual que en server.js)
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['cliente', 'admin'],
    default: 'cliente'
  },
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

async function seedUsers() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Verificar si ya existen usuarios
    const existingUsers = await User.countDocuments();
    if (existingUsers > 0) {
      console.log(`⚠️  Ya existen ${existingUsers} usuarios en la base de datos`);
      console.log('Si quieres recrearlos, elimínalos manualmente desde MongoDB Atlas');
      await mongoose.disconnect();
      process.exit(0);
    }

    // Crear usuarios de prueba
    const users = [
      {
        email: 'admin@impertula.com',
        password: await bcrypt.hash('admin123', 10),
        role: 'admin',
        name: 'Administrador'
      },
      {
        email: 'cliente@impertula.com',
        password: await bcrypt.hash('cliente123', 10),
        role: 'cliente',
        name: 'Cliente Demo'
      }
    ];

    // Insertar usuarios
    const createdUsers = await User.insertMany(users);
    console.log(`✅ ${createdUsers.length} usuarios creados exitosamente:`);
    
    createdUsers.forEach(user => {
      console.log(`   - ${user.email} (${user.role})`);
    });

    console.log('\n📋 Credenciales para login:');
    console.log('   Admin: admin@impertula.com / admin123');
    console.log('   Cliente: cliente@impertula.com / cliente123');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n👋 Desconectado de MongoDB');
    process.exit(0);
  }
}

seedUsers();