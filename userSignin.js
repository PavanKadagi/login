const userSignIn = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Plz filled the field properly...!" });
      }
  
      const userLogin = await User.findOne({ email: email });
  
      if (userLogin) {
        const passwordMatch = await bcrypt.compare(password, userLogin.password);
  
        if (passwordMatch) {
         if(userLogin.is_verified){
             //need to generate the token and stored cookie after the password match
             const token = await userLogin.generatingToken();
             // console.log('backend login',)
             console.log("-----------   --token", token);
     
             res.cookie("user", token, {
              //  expires: new Date(Date.now() + 2589200000),
              // expires:new Date(Date.now() + 600000),
               httpOnly: true,
              //  path: "/",
             });
             console.log('check cookies')
        
          return res.status(200).json({ message: "Signin Successfull...!" });
         }else{
          return res.status(400).json({ error: "Please verify your mail...!" });
         }
        } else {
          return res.status(400).json({ error: "Invalid Credientials...!" });
        }
      } else {
        return res.status(400).json({ error: "Invalid Credientials " });
      }
      // console.log(userLogin);
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error: "Invalid Credientials" });
    }
  };