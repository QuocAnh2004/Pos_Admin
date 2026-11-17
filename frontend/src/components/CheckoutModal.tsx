'use client';

import { useState } from 'react';
import { formatVnd } from '@/lib/format';
import { calcChange } from '@/lib/payment';

interface Props {
  total: number;
  submitting: boolean;
  onConfirm: (cashReceived: number) => void;
  onClose: () => void;
}

const QUICK_CASH = [50000, 100000, 200000, 500000];

// Modal thanh toán tiền mặt (T-16). Dùng class Bootstrap, không cần bootstrap.js
export default function CheckoutModal({ total, submitting, onConfirm, onClose }: Props) {
  const [cash, setCash] = useState<number>(total);
  const change = calcChange(total, cash);

  return (
    <>
      <div className="modal d-block" tabIndex={-1} role="dialog" aria-modal="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Thanh toán tiền mặt</h5>
              <button type="button" className="btn-close" aria-label="Đóng" onClick={onClose} />
            </div>
            <div className="modal-body">
              <div className="d-flex justify-content-between mb-3">
                <span>Tổng tiền</span>
                <strong className="fs-4">{formatVnd(total)}</strong>
              </div>

              <label htmlFor="cash" className="form-label">Tiền khách đưa</label>
              <input
                id="cash"
                type="number"
                min={0}
                step={1000}
                className="form-control form-control-lg mb-2"
                value={Number.isNaN(cash) ? '' : cash}
                onChange={(e) => setCash(e.target.valueAsNumber)}
              />
              <div className="d-flex flex-wrap gap-2 mb-3">
                <button type="button" className="btn btn-outline-secondary" onClick={() => setCash(total)}>
                  Đủ tiền
                </button>
                {QUICK_CASH.map((v) => (
                  <button key={v} type="button" className="btn btn-outline-secondary" onClick={() => setCash(v)}>
                    {formatVnd(v)}
                  </button>
                ))}
              </div>

              <div className="d-flex justify-content-between">
                <span>Tiền thừa</span>
                <strong className={`fs-4 ${change === null ? 'text-danger' : 'text-success'}`}>
                  {change === null ? 'Chưa đủ tiền' : formatVnd(change)}
                </strong>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-light" onClick={onClose}>
                Huỷ
              </button>
              <button
                type="button"
                className="btn btn-success btn-lg"
                disabled={change === null || submitting}
                onClick={() => onConfirm(cash)}
              >
                {submitting ? 'Đang lưu…' : 'Xác nhận thanh toán'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show" />
    </>
  );
}
