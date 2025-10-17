// seed.js - Script para crear usuarios iniciales en MongoDB
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ ERROR: MONGODB_URI no está definido en .env');
  process.exit(1);
}

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
    console.log('🌱 [SEED] Iniciando proceso de creación de usuarios...');
    
    // Conectar a MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ [SEED] Conectado a MongoDB');

    // Verificar si ya existen usuarios
    const existingUsers = await User.countDocuments();
    if (existingUsers > 0) {
      console.log(`⚠️  [SEED] Ya existen ${existingUsers} usuarios en la base de datos`);
      console.log('💡 [SEED] Si quieres recrearlos, elimínalos manualmente desde MongoDB Atlas');
      await mongoose.disconnect();
      process.exit(0);
    }

    console.log('📝 [SEED] Creando usuarios de prueba...');

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
    console.log(`✅ [SEED] ${createdUsers.length} usuarios creados exitosamente:`);
    
    createdUsers.forEach(user => {
      console.log(`   👤 ${user.email} (${user.role}) - ID: ${user._id}`);
    });

    console.log('\n📋 Credenciales para login:');
    console.log('   🔑 Admin: admin@impertula.com / admin123');
    console.log('   🔑 Cliente: cliente@impertula.com / cliente123');

  } catch (error) {
    console.error('💥 [SEED] Error:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    await mongoose.disconnect();
    console.log('\n👋 [SEED] Desconectado de MongoDB');
    process.exit(0);
  }
}

seedUsers();