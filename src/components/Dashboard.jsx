import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { FiUser, FiMail, FiPhone, FiCalendar } from 'react-icons/fi';

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white">
              <h3 className="mb-0">My Profile</h3>
            </Card.Header>
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <div
                  style={{
                    width: '100px',
                    height: '100px',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    borderRadius: '50%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                  }}
                >
                  {currentUser.firstName.charAt(0)}
                  {currentUser.lastName.charAt(0)}
                </div>
              </div>

              <h4 className="text-center mb-4">
                {currentUser.firstName} {currentUser.lastName}
              </h4>

              <Row className="mb-3">
                <Col sm={4} className="text-muted">
                  <FiMail className="me-2" />
                  Email:
                </Col>
                <Col sm={8}>
                  <strong>{currentUser.email}</strong>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col sm={4} className="text-muted">
                  <FiPhone className="me-2" />
                  Phone:
                </Col>
                <Col sm={8}>
                  <strong>{currentUser.phone}</strong>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col sm={4} className="text-muted">
                  <FiCalendar className="me-2" />
                  Member Since:
                </Col>
                <Col sm={8}>
                  <strong>
                    {new Date(currentUser.createdAt).toLocaleDateString()}
                  </strong>
                </Col>
              </Row>

              <div className="text-center">
                <Button
                  variant="primary"
                  onClick={() => navigate('/edit-profile')}
                  className="px-4"
                >
                  Edit Profile
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
