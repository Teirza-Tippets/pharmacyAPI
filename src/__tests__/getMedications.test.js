const request = require('supertest');
const app = require('../../server');
const medicationRoute = require('../routes/drugs/medication');

describe('GET /medication', () => {
  it('should return a list of medications', async () => {

    const fakeMeds = [
      { _id: '1', brandName: 'Cipro', genericName: 'Ciprofloxacin', manufacturer: 'Bayer Healthcare Pharmaceuticals Inc', dosageStrength: ['250 mg', '500 mg', '750 mg'], dosageForm: ['tablet', 'injection'], drugClass: 'Fluoroquinolone' },
      { _id: '2', brandName: 'Amoxil', genericName: 'Amoxicillin', manufacturer: 'Teva Pharmaceuticals USA Inc', dosageStrength: ['250 mg', '500 mg', '125 mg/5 mL', '250 mg/5 mL'], dosageForm: ['pill', 'liquid'], drugClass: 'Antibacterial drug' }
    ];

    const req = {
        app: {
            locals: {
            db: {
                collection: jest.fn().mockReturnValue({
                find: jest.fn().mockReturnValue({
                    toArray: jest.fn().mockResolvedValue(fakeMeds)
                })
                })
            }
            }
        }
    };

    const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
    };

    const next = jest.fn();

    const getHandler = medicationRoute.stack.find(layer => layer.route && layer.route.path === '/' && layer.route.methods.get).route.stack[0].handle;

    await getHandler(req, res, next);

    expect(res.json).toHaveBeenCalledWith(fakeMeds);
    expect(res.status).not.toHaveBeenCalledWith(500);
  });
});

it('should handle errors gracefully', async () => {
    const req = {
        app: {
        locals: {
            db: {
            collection: jest.fn().mockReturnValue({
                find: jest.fn().mockReturnValue({
                toArray: jest.fn().mockRejectedValue(new Error('Database error'))
                })
            })
            }
        }
        }
    };
    
    const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
    };
    
    const next = jest.fn();
    
    const getHandler = medicationRoute.stack.find(layer => layer.route && layer.route.path === '/' && layer.route.methods.get).route.stack[0].handle;
    
    await getHandler(req, res, next);
    
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Failed to fetch medications' });
});