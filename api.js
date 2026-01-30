const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const app = express();
app.use(cors());
app.use(express.json());

app.post('/login', async(req, res)=>{

    const { email, senha, cpf } = req.body
 
    if(!email || !senha || !cpf) {
    return res.status(400).json({ error: 'Email, senha e cpf são obrigatórios' })
}

    const { data, error } = await supabase
    .from('login')
    .insert([{ email, senha, cpf }]);

    if(error){
        return res.status(500).json({ error: error.message})
    }
    return res.status(201).json({ message: 'Login realizado com sucesso', data });
})

app.get('/contas', async (req, res) => {

    const { data, error } = await supabase
        .from('login')
        .select('*');

    if (error) {
    return res.status(500).json({ error: error.message });
    }
    return res.status(200).json({ login: data });
})
app.listen(3000, () => {
  console.log('Server is running on port 3000');

});
