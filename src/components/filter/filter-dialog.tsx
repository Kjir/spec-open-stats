import { useState } from 'react';
import styles from './filter-dialog.module.css'
import FilterMapItem from './filter-map-item';
import { pull, uniq, merge, cloneDeep } from 'lodash-es';
import FilterBracketItem from './filter-bracket-item';
import FilterStageItem from './filter-stage-item';
import useBaseUrl from '@docusaurus/useBaseUrl';

export type Filter = {
    maps: string[],
    brackets: string[],
    stages: string[],
    appliedFilters: {
        any: boolean,
        stages: boolean,
        brackets: boolean,
        maps: boolean,
    },
};

export default function FilterDialog(): JSX.Element {
    const onClickHandler = (isApplied) => {
        const dialog = document.getElementById('filter-dialog') as HTMLDialogElement;
        if (isApplied && typeof (window as any).setFilter === 'function') {
            (window as any).setFilter(filter);
        }
        dialog.close();
    };
    const defaultFilter: Filter = {
        maps: [
            "SPEC Atacama", "SPEC Cliffbound", "SPEC Dry Graveyards", "SPEC Haboob", 'SPEC Higher Ground', 'SPEC Land Madness', 'SPEC Ravines', 'SPEC Sacred Springs', 'SPEC Sandrift',
        ],
        brackets: [
            'General', 'Lancer', 'Knight', 'Mercenary', 'Soldier', 'Recruit'
        ],
        stages: [
            'Group', 'Quarter Final', 'Semi Final', 'Final',
        ],
        appliedFilters: {
            any: false,
            stages: false,
            brackets: false,
            maps: false,
        },
    };
    const [filter, setFilter] = useState(cloneDeep(defaultFilter));
    const onMapFilterChange = (mapname, value) => {
        const newSelectedMaps = value === false ? pull(filter.maps, mapname) : uniq(filter.maps.concat(mapname));
        setFilter(merge({}, filter, {
            maps: newSelectedMaps,
            appliedFilters: {
                maps: newSelectedMaps.length != defaultFilter.maps.length,
                any: filter.appliedFilters.stages || filter.appliedFilters.brackets || newSelectedMaps.length != defaultFilter.maps.length,
            },
        }));
    };
    const onBracketFilterChange = (bracketName, value) => {
        const newSelectedBrackets = value === false ? pull(filter.brackets, bracketName) : uniq(filter.brackets.concat(bracketName));
        setFilter(merge({}, filter, {
            brackets: newSelectedBrackets,
            appliedFilters: {
                brackets: newSelectedBrackets.length != defaultFilter.brackets.length,
                any: filter.appliedFilters.stages || newSelectedBrackets.length != defaultFilter.brackets.length || filter.appliedFilters.maps,
            },
        }));
    };
    const onStageFilterChange = (stageName, value) => {
        const newSelectedStages = value === false ? pull(filter.stages, stageName) : uniq(filter.stages.concat(stageName));
        setFilter(merge({}, filter, {
            stages: newSelectedStages,
            appliedFilters: {
                stages: newSelectedStages.length != defaultFilter.stages.length,
                any: newSelectedStages.length != defaultFilter.stages.length || filter.appliedFilters.brackets || filter.appliedFilters.maps,
            },
        }));
    };

    return (
        <dialog id="filter-dialog" className={styles['dialog']}>
            <h2>Maps</h2>
            <div className={styles['map-container']}>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/SPEC_Atacama.png')}
                    value={filter.maps.includes('SPEC Atacama')}
                    onChange={onMapFilterChange.bind(this, 'SPEC Atacama')}
                    name="Atacama">
                </FilterMapItem>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/SPEC_Cliffbound.png')}
                    value={filter.maps.includes('SPEC Cliffbound')}
                    onChange={onMapFilterChange.bind(this, 'SPEC Cliffbound')}
                    name="Cliffbound">
                </FilterMapItem>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/SPEC_Dry_Graveyards.png')}
                    value={filter.maps.includes('SPEC Dry Graveyards')}
                    onChange={onMapFilterChange.bind(this, 'SPEC Dry Graveyards')}
                    name="Dry Graveyards">
                </FilterMapItem>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/SPEC_Haboob.png')}
                    value={filter.maps.includes('SPEC Haboob')}
                    onChange={onMapFilterChange.bind(this, 'SPEC Haboob')}
                    name="Haboob">
                </FilterMapItem>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/SPEC_Higher_Ground.png')}
                    value={filter.maps.includes('SPEC Higher Ground')}
                    onChange={onMapFilterChange.bind(this, 'SPEC Higher Ground')}
                    name="Higher Ground">
                </FilterMapItem>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/SPEC_Land_Madness.png')}
                    value={filter.maps.includes('SPEC Land Madness')}
                    onChange={onMapFilterChange.bind(this, 'SPEC Land Madness')}
                    name="Land Madness">
                </FilterMapItem>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/SPEC_Ravines.png')}
                    value={filter.maps.includes('SPEC Ravines')}
                    onChange={onMapFilterChange.bind(this, 'SPEC Ravines')}
                    name="Ravines">
                </FilterMapItem>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/SPEC_Sacred_Springs.png')}
                    value={filter.maps.includes('SPEC Sacred Springs')}
                    onChange={onMapFilterChange.bind(this, 'SPEC Sacred Springs')}
                    name="Sacred Springs">
                </FilterMapItem>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/SPEC_Sandrift.png')}
                    value={filter.maps.includes('SPEC Sandrift')}
                    onChange={onMapFilterChange.bind(this, 'SPEC Sandrift')}
                    name="Sandrift">
                </FilterMapItem>
            </div>
            <hr />
            <h2>Brackets</h2>
            <div className={styles['map-container']}>
                <FilterBracketItem
                    imageSrc={useBaseUrl('/img/brackets/Champion.webp')}
                    value={filter.brackets.includes('General')}
                    onChange={onBracketFilterChange.bind(this, 'General')}
                    name={"General"}>
                </FilterBracketItem>
                <FilterBracketItem
                    imageSrc={useBaseUrl('/img/brackets/Monk.webp')}
                    value={filter.brackets.includes('Lancer')}
                    onChange={onBracketFilterChange.bind(this, 'Lancer')}
                    name={"Lancer"}>
                </FilterBracketItem>
                <FilterBracketItem
                    imageSrc={useBaseUrl('/img/brackets/Knight.webp')}
                    value={filter.brackets.includes('Knight')}
                    onChange={onBracketFilterChange.bind(this, 'Knight')}
                    name={"Knight"}>
                </FilterBracketItem>
                <FilterBracketItem
                    imageSrc={useBaseUrl('/img/brackets/Mangonel.webp')}
                    value={filter.brackets.includes('Mercenary')}
                    onChange={onBracketFilterChange.bind(this, 'Mercenary')}
                    name={"Mercenary"}>
                </FilterBracketItem>
                <FilterBracketItem
                    imageSrc={useBaseUrl('/img/brackets/Spearman.webp')}
                    value={filter.brackets.includes('Soldier')}
                    onChange={onBracketFilterChange.bind(this, 'Soldier')}
                    name={"Soldier"}>
                </FilterBracketItem>
                <FilterBracketItem
                    imageSrc={useBaseUrl('/img/brackets/Militia.webp')}
                    value={filter.brackets.includes('Recruit')}
                    onChange={onBracketFilterChange.bind(this, 'Recruit')}
                    name={"Recruit"}>
                </FilterBracketItem>
            </div>
            <hr />
            <h2>Stages</h2>
            <div className={styles['map-container']}>
                <FilterStageItem
                    value={filter.stages.includes('Group')}
                    onChange={onStageFilterChange.bind(this, 'Group')}
                    name="Group">
                </FilterStageItem>
                <FilterStageItem
                    value={filter.stages.includes('Quarter Final')}
                    onChange={onStageFilterChange.bind(this, 'Quarter Final')}
                    name="Quarterfinals">
                </FilterStageItem>
                <FilterStageItem
                    value={filter.stages.includes('Semi Final')}
                    onChange={onStageFilterChange.bind(this, 'Semi Final')}
                    name="Semifinals">
                </FilterStageItem>
                <FilterStageItem
                    value={filter.stages.includes('Final')}
                    onChange={onStageFilterChange.bind(this, 'Final')}
                    name="Finals">
                </FilterStageItem>
            </div>
            <hr />
            <div className={styles['action-container']}>
                <button onClick={onClickHandler.bind(this, true)} className={`${styles['action-btn']}`}>APPLY FILTERS</button>
                <button onClick={onClickHandler.bind(this, false)} className={`${styles['action-btn']}`}>CANCEL</button>
            </div>
        </dialog>
    );
}
