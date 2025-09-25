import express, { Request, Response } from "express"
import bcrypt from "bcryptjs"

import { sequelize } from "./db";
import { authenticateToken, generateToken } from "./auth";

import Task from "./Task";
import User from "./User";

User.hasMany(Task, { foreignKey: "userId" })
Task.belongsTo(User, { foreignKey: "userId" })

sequelize
  .sync()
  .then(() => console.log("✅ Database connected and synced"))
  .catch((err) => console.error("❌ Error connecting DB:", err));


const app = express()
const port = 4000

app.use(express.json())

//Buscar todas as Tasks de um usuário
app.get('/users/:userId/tasks', authenticateToken, async (req:Request, res:Response) => {
    const { userId } = req.params

    if ((req as any).user.id !== parseInt(userId)) {
      return res.status(403).json({ error: "Acesso negado" })
    }

    try {
      const tasks = await Task.findAll({ where: {userId} })
      res.status(200).json(tasks)
    } catch (error) {
      res.status(500).json({ error: "Tasks de usuario não encontradas", details: error})
    }
})

//Criar uma nova Task para um usuário
app.post('/users/:userId/tasks', authenticateToken, async (req:Request, res:Response) => {
    const { userId } = req.params
    const { title, description, status } = req.body

    if ((req as any).user.id !== parseInt(userId)) {
      return res.status(403).json({ error: "Acesso negado" })
    }

    try {
      const task = await Task.create({
        title,
        description,
        status,
        userId: parseInt(userId, 10),
      })

      res.status(201).json({ message: 'Task criada', task })

    } catch (error) {
      res.status(500).json({ error: "Erro ao criar task", details: error })
    }
})

//Buscar uma Task específica de um usuário
app.get('/users/:userId/tasks/:taskId', authenticateToken, async (req:Request, res:Response) => {
    const { userId, taskId } = req.params

    if ((req as any).user.id !== parseInt(userId)) {
      return res.status(403).json({ error: "Acesso negado" })
    }
    
    try {
      const task = await Task.findByPk(taskId)

      if (!task){
        return res.status(404).json({ error: "Task não encontrada" })
      }

      if (task.userId !== parseInt(userId, 10)) {
        return res.status(403).json({ error: "Task não pertence a esse usuário" })
      }

      res.status(200).json(task)

    } catch (error) {
      res.status(500).json({ error: "Erro para encontrar task", details: error })
    }
})

//Atualizar uma Task de um usuário
app.put('/users/:userId/tasks/:taskId', authenticateToken, async (req:Request, res:Response) => {
  const { userId, taskId } = req.params
  const { title, description, status } = req.body

  if ((req as any).user.id !== parseInt(userId)) {
      return res.status(403).json({ error: "Acesso negado" })
    }

  try {
    const task = await Task.findByPk(taskId)

    if(!task)
      return res.status(404).json({ error: "Task não encontrada" })
  
    if(task.userId !== parseInt(userId, 10))
      return res.status(403).json({ error: "Task encontrada não pertence ao usuário"})

    task.title = title ?? task.title
    task.description = description ?? task.description
    task.status = status ?? task.status

    await task.save();

    res.status(200).json({ message: "Task atualizada", task })
  
  } catch (error) {
    res.status(500).json({ error: "Problema ao atualizar task", details: error })
  }
})

//Deletar uma Task de um usuário
app.delete('/users/:userId/tasks/:taskId', authenticateToken, async (req:Request, res:Response) => {
  const { userId, taskId } = req.params

  if ((req as any).user.id !== parseInt(userId)) {
      return res.status(403).json({ error: "Acesso negado" })
    }

  try {
    const deleteTask = await Task.findByPk(taskId)

    if(!deleteTask)
      return res.status(404).json({ error: "Task não encontrada" })

    if(deleteTask.userId !== parseInt(userId, 10))
      return res.status(403).json({ error: "Task encontrada não pertence ao usuário"})

    await deleteTask.destroy();

    res.status(200).json({ message:"Task deletada", deleteTask })

  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar task", details: error})
  }
})

//Criar novo usuário
app.post('/users/register', async (req:Request, res:Response) => {
  const { user, pass } = req.body
  const hashedPass = await bcrypt.hash(pass, 10)
  
  try {
    const newUser = User.create({
      username: user,
      password: hashedPass,
    })

    res.status(201).json({ message: "Usuário criado com sucesso", newUser })

  } catch (error) {
    res.status(500).json({ error: "Problemas ao criar usuário", details: error })
  }

})

//Fazer login de um usuário
app.post('/users/login', async (req:Request, res:Response) => {
  const { user, pass } = req.body

  try {
    const loginUser = await User.findOne({ where: { username: user } })

    if (!loginUser) {
      return res.status(404).json({ error: "Usuário não encontrado" })
    }

    const validPassword = await bcrypt.compare(pass, loginUser.password)
    
    if (!validPassword) {
      return res.status(401).json({ error: "Senha errada" })
    }

    const token = generateToken(loginUser.id);
    
    res.status(200).json({ message: "Login realizado", token });

  } catch (error) {
    res.status(500).json({ error: "Problemas com o login", details: error })
  }
})

app.listen(port, () => {
  console.log(`Taskflow API listening on port ${port}`)
})