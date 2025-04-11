import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import './Login.css';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = isSignup ? 'signup' : 'login';
      const res = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isSignup ? { name, email, password } : { email, password }),
      });

      const data = await res.json();
      console.log(data);
      setMessage(data.message);
    } catch (err) {
      console.error(err);
      setMessage('❌ มีบางอย่างผิดพลาด');
    }
  };

  return (
    <Container fluid className={`vh-100 auth-container ${isSignup ? 'signup-mode' : 'signup-mode'}`}>
      <Row className="h-100">
        {/* 🔵 ฝั่งแสดงข้อความเฉยๆ */}
        <Col
          md={6}
          className="d-none d-md-flex flex-column justify-content-center align-items-center text-white side-panel"
        >
          <div className="text-center px-4">
            <h1 className="mb-3">{isSignup ? 'มีบัญชีอยู่แล้ว?' : 'ยังไม่มีบัญชี?'}</h1>
            <h4 className="fw-light">
              {isSignup
                ? 'เข้าสู่ระบบเพื่อใช้งานของคุณ'
                : 'สมัครสมาชิกเพื่อเริ่มต้นใช้งานแพลตฟอร์มของเรา'}
            </h4>
          </div>
        </Col>

        {/* ⚪ ฝั่งฟอร์ม login/signup */}
        <Col xs={12} md={6} className="d-flex justify-content-center align-items-center bg-light form-panel">
          <div
            className="p-4 bg-white shadow"
            style={{
              width: '100%',
              maxWidth: '400px',
              borderRadius: '1rem',
            }}
          >
            <h2 className="text-center mb-4 text-primary">{isSignup ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ'}</h2>
            <p className="text-center">
              {isSignup ? 'มีบัญชีแล้วใช่ไหม?' : 'ยังไม่มีบัญชี?'}{' '}
              <span className="link-primary" style={{ cursor: 'pointer' }} onClick={() => setIsSignup(!isSignup)}>
                {isSignup ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}
              </span>
            </p>

            {message && <Alert variant="info">{message}</Alert>}

            <Form onSubmit={handleSubmit}>
              {isSignup && (
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>ชื่อผู้ใช้</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="กรอกชื่อ"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
              )}

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>อีเมล</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="กรอกอีเมล"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>รหัสผ่าน</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder="กรอกรหัสผ่าน"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </Button>
                </InputGroup>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 fw-bold">
                {isSignup ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ'}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;