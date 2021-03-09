import React, {
  FC,
} from 'react';

//components
import VisualizationsNav from 'components/visualizations-nav';
import Dropdown from 'components/select/component';


interface CardProps {
  title?: string,
  description?: string,
}

const Card: FC<CardProps> = ({
  title,
  description,
}: CardProps) => (
    <div className="bg-white rounded-lg text-black divide-y-2 divide-gray">
      <VisualizationsNav selected={'Line'} />
      <div className="inline-flex flex">
        <section className="flex-1">
          <div className="inline-flex flex">
            <h2>Overall energy balance</h2>
            <Dropdown label="Change indicator:" />
          </div>
          <div>
            Showing for:<Dropdown />
            <p>Widget</p>
          </div>
        </section>
        <section>
          <div className="bg-gray rounded-lg">Filters</div>
          <div className="bg-gray rounded-lg">Download</div>
        </section>
      </div>

      {/* Subgroup title, dynamic*/}


    </div>
  );

export default Card;
