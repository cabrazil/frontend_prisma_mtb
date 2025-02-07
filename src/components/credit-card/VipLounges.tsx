import React from 'react';
import { Globe } from 'lucide-react';
import { FaCheck } from 'react-icons/fa';
import CardDetailSection from './CardDetailSection';
import { Separator } from '../Separator';

interface CardProps {
  cardDetail: {
    id:             string;
    ranking_vip_lounges:   number;
    vip_lounge_app:        string;
    lounges: {
      id:           string;
      lounge_name:  string;
      br_airport:   string[];
      int_airport:  string;
      access_limit: string;
      conditions:   string;
      ispaid:       boolean;
    }[];
  }
}

interface CardFeatureProps {
  label: string;
  value: string | string[] | number | boolean;
  icon?: boolean;
  className?: string;
}

const CardFeature: React.FC<CardFeatureProps> = ({ 
  label, 
  value, 
  icon = false, 
  className = ''
}) => (
  <div className={`ml-2 flex justify-between ${className}`}>
    <div className="flex">
      {icon && (
        <span className={typeof value === 'boolean' && value ? 'text-yellow-500' : 'text-green-500'}>
          <FaCheck />
        </span>
      )}
      <span>{label}</span>
    </div>
    <div>
      <span className="text-gray-950 font-semibold">
        {typeof value === 'boolean' ? (value ? 'Sim' : 'Não') : value}
      </span>
    </div>
  </div>
);

export const VipLounges: React.FC<CardProps> = ({ cardDetail }) => {
  const COLORS = {
    PRIMARY: '#1F3B4D',
    TEXT_PRIMARY: '#4b5563',
    HIGHLIGHT: '#4169e1',
  };

  return (
    <CardDetailSection
      title="Acesso às Salas VIP"
      icon={<Globe color={COLORS.HIGHLIGHT} />}
      className='text-md font-semibold'
    >
      <div style={{ color: COLORS.TEXT_PRIMARY }}>

        {cardDetail?.lounges.map((item) => (
          <ul>
            <li>
              {!item.ispaid
              ?
              <CardFeature label="Sala:" value={item.lounge_name} icon={true} />
              :
              <CardFeature label="Sala:" value={item.lounge_name} icon={false} />}

              {item?.br_airport[0] &&
              <CardFeature label="Aeroportos nacionais:" value={item.br_airport} />}
              
              {item?.int_airport[0] &&
              <CardFeature label="Aeroportos internacionais:" value={item.int_airport} />}
     
              {item.access_limit &&
              <CardFeature label="Limite de acessos:" value={item.access_limit} />}
              
              {item.conditions &&
              <CardFeature label="Condições:" value={item.conditions} />}

              <div>
                <Separator   />
              </div>
              
            </li>
          </ul>
        ))}

        {cardDetail.vip_lounge_app &&
          <CardFeature label="Aplicativo:" value={cardDetail.vip_lounge_app} icon={true} />}
      </div>
    </CardDetailSection>
  );
};

export default VipLounges;

