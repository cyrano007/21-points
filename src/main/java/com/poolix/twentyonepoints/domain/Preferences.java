package com.poolix.twentyonepoints.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import com.poolix.twentyonepoints.domain.enumeration.Units;

/**
 * A Preferences.
 */
@Entity
@Table(name = "preferences")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Preferences implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Min(value = 10)
    @Max(value = 21)
    @Column(name = "weekly_goal")
    private Integer weekly_goal;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "weight_unit", nullable = false)
    private Units weight_unit;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getWeekly_goal() {
        return weekly_goal;
    }

    public Preferences weekly_goal(Integer weekly_goal) {
        this.weekly_goal = weekly_goal;
        return this;
    }

    public void setWeekly_goal(Integer weekly_goal) {
        this.weekly_goal = weekly_goal;
    }

    public Units getWeight_unit() {
        return weight_unit;
    }

    public Preferences weight_unit(Units weight_unit) {
        this.weight_unit = weight_unit;
        return this;
    }

    public void setWeight_unit(Units weight_unit) {
        this.weight_unit = weight_unit;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Preferences preferences = (Preferences) o;
        if (preferences.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), preferences.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Preferences{" +
            "id=" + getId() +
            ", weekly_goal=" + getWeekly_goal() +
            ", weight_unit='" + getWeight_unit() + "'" +
            "}";
    }
}
