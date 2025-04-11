import { Router, Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs'; // เพิ่มด้านบนสุด

const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ success: false, message: 'อีเมลไม่ถูกต้อง' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'รหัสผ่านไม่ถูกต้อง' });
  }

  return res.json({ success: true, message: 'เข้าสู่ระบบสำเร็จ', user: user.name });
});


router.post('/signup', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    // ตรวจสอบว่า email ซ้ำหรือยัง
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'อีเมลนี้มีผู้ใช้งานแล้ว' });
    }

    // 🔐 เข้ารหัส password ก่อนเก็บ
    const hashedPassword = await bcrypt.hash(password, 10); // 10 คือ salt rounds

    // สร้าง user ใหม่พร้อม password ที่ hash แล้ว
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ success: true, message: 'สมัครสมาชิกสำเร็จ' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการสมัครสมาชิก' });
  }
});



export default router;
