import { Input, Select, Switch } from 'antd';
import React from 'react';
import { useMyList } from '../providers/context';

function MyInput({ value, field, onChange, disabled }) {
    const { category } = useMyList()
    const placeholder = field;
    switch (field) {
        case 'status':
            return <Switch disabled={disabled} value={value == 'active'} onChange={(e) => onChange(e ? 'active' : 'disable')} checkedChildren="active" unCheckedChildren={"disable"} />
        case 'is18Plus':
            return <Switch disabled={disabled} value={value == 'yes'} onChange={(e) => onChange(e ? 'yes' : 'no')} checkedChildren="18+" style={value == 'yes' && { background: '#ff0000' }} />
        case 'category_ids':
            return <Select
                disabled={disabled}
                mode="multiple"
                placeholder={placeholder}
                allowClear
                value={value?.split(',')} onChange={(v) => onChange(v.join(','))}
                filterOption={(inputValue, option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0}
                options={
                    category.map((c) => {
                        return {
                            label: c.name,
                            value: c.id,
                        }
                    })
                }
            />
        default:
            return <Input disabled={disabled} value={value} placeholder={placeholder} onChange={onChange} />
    }
}

export default MyInput;